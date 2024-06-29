"use client";
import {
  useMantineColorScheme,
  AppShell,
  Burger,
  Group,
  ActionIcon,
  useComputedColorScheme,
  Combobox,
  InputBase,
  useCombobox,
  Input,
  Divider,
  Stack,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./dashboard.module.css";
import cx from "clsx";
import { useState } from "react";

import { FcGoogle } from "react-icons/fc";
import {
  MdLightMode,
  MdDarkMode,
  MdMonitorHeart,
  MdError,
  MdAccountCircle,
} from "react-icons/md";
import { IoMdNotifications, IoMdSettings } from "react-icons/io";
import { PiPhoneCallFill } from "react-icons/pi";
import { RiPagesFill, RiTeamFill } from "react-icons/ri";
import { FaDonate, FaGithub } from "react-icons/fa";
import { useTranslations } from "next-intl";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations("Dashboard");
  const groceries = ["Hegonal", "test"];

  const sidebarData = [
    { link: "", label: t("monitor"), icon: MdMonitorHeart },
    { link: "", label: t("incidents"), icon: MdError },
    { link: "", label: t("statusPage"), icon: RiPagesFill },
    { link: "", label: t("onCall"), icon: PiPhoneCallFill },
    { link: "", label: t("notify"), icon: IoMdNotifications },
    { link: "", label: t("setting"), icon: IoMdSettings },
  ];

  const sidebarFooterData = [
    { link: "", label: t("hegonalSetting"), icon: IoMdSettings },
    { link: "", label: t("addTeam"), icon: RiTeamFill },
    { link: "", label: t("account"), icon: MdAccountCircle },
  ];

  const [active, setActive] = useState(t("monitor"));

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [value, setValue] = useState<string | null>("Hegonal");

  const [opened, { toggle }] = useDisclosure();
  const { setColorScheme, clearColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  const options = groceries.map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ));

  const sidebarLinks = sidebarData.map((item) => (
    <a
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} size={20} />
      <span>{item.label}</span>
    </a>
  ));

  const sidebarFooter = sidebarFooterData.map((item) => (
    <a
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} size={20} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 200,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <FcGoogle size={30} />
          <Group h="100%" px="0" justify="flex-end" gap="8px">
            <ActionIcon aria-label="Github" variant="default">
              <FaGithub />
            </ActionIcon>
            <ActionIcon aria-label="Donation" variant="default">
              <FaDonate />
            </ActionIcon>
            <ActionIcon
              aria-label="Change color scheme"
              variant="default"
              onClick={() =>
                setColorScheme(
                  computedColorScheme === "light" ? "dark" : "light"
                )
              }
            >
              <MdLightMode className={cx(classes.icon, classes.light)} />
              <MdDarkMode className={cx(classes.icon, classes.dark)} />
            </ActionIcon>
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <Stack justify="space-between" gap="0" h={"100%"}>
          <div>
            <Combobox
              store={combobox}
              onOptionSubmit={(val) => {
                setValue(val);
                combobox.closeDropdown();
              }}
            >
              <Combobox.Target>
                <InputBase
                  label={t("chooseYourTeam")}
                  component="button"
                  type="button"
                  pointer
                  rightSection={<Combobox.Chevron />}
                  rightSectionPointerEvents="none"
                  onClick={() => combobox.toggleDropdown()}
                >
                  {value || (
                    <Input.Placeholder>{t("chooseYourTeam")}</Input.Placeholder>
                  )}
                </InputBase>
              </Combobox.Target>

              <Combobox.Dropdown>
                <Combobox.Options>{options}</Combobox.Options>
              </Combobox.Dropdown>
            </Combobox>

            <Divider my="md" />

            {sidebarLinks}
          </div>

          <div>
            <Divider my="md" />
            {sidebarFooter}
          </div>
        </Stack>
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}

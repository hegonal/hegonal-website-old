"use client";
import {
  useMantineColorScheme,
  Button,
  AppShell,
  Burger,
  Group,
  Skeleton,
  ActionIcon,
  useComputedColorScheme,
  Combobox,
  InputBase,
  useCombobox,
  Input,
  Divider,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FcGoogle } from "react-icons/fc";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import classes from "./dashboard.module.css";
import cx from "clsx";
import { useState } from "react";

const groceries = ["Hegonal", "test"];

const data = [
  { link: "", label: "Notifications", icon: MdDarkMode },
  { link: "", label: "Billing", icon: MdDarkMode },
  { link: "", label: "Security", icon: MdDarkMode },
  { link: "", label: "SSH Keys", icon: MdDarkMode },
  { link: "", label: "Databases", icon: MdDarkMode },
  { link: "", label: "Authentication", icon: MdDarkMode },
  { link: "", label: "Other Settings", icon: MdDarkMode },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [active, setActive] = useState("Billing");

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [value, setValue] = useState<string | null>(null);

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

  const links = data.map((item) => (
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
      <item.icon className={classes.linkIcon} size={20}/>
      <span>{item.label}</span>
    </a>
  ));
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: { sm: 200, lg: 300 },
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <FcGoogle size={30} />
          <Group h="100%" px="0" justify="flex-end">
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
        <Combobox
          store={combobox}
          onOptionSubmit={(val) => {
            setValue(val);
            combobox.closeDropdown();
          }}
        >
          <Combobox.Target>
            <InputBase
              label="Choose your team"
              component="button"
              type="button"
              pointer
              rightSection={<Combobox.Chevron />}
              rightSectionPointerEvents="none"
              onClick={() => combobox.toggleDropdown()}
            >
              {value || <Input.Placeholder>Choose your team</Input.Placeholder>}
            </InputBase>
          </Combobox.Target>

          <Combobox.Dropdown>
            <Combobox.Options>{options}</Combobox.Options>
          </Combobox.Dropdown>
        </Combobox>

        <Divider my="md" />
        
        {links}
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}

"use client";
import {
  TextInput,
  PasswordInput,
  Box,
  rem,
  Progress,
  Popover,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import classes from "./signup.module.css";
import { MdOutlineCancel, MdOutlineCheckCircle } from "react-icons/md";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

function PasswordRequirement({
  meets,
  label,
}: {
  meets: boolean;
  label: string;
}) {
  return (
    <Text
      c={meets ? "teal" : "red"}
      style={{ display: "flex", alignItems: "center" }}
      mt={7}
      size="sm"
    >
      {meets ? (
        <MdOutlineCheckCircle style={{ width: rem(14), height: rem(14) }} />
      ) : (
        <MdOutlineCancel style={{ width: rem(14), height: rem(14) }} />
      )}{" "}
      <Box ml={10}>{label}</Box>
    </Text>
  );
}

type requirementsType = {
  re: RegExp;
  label: string;
};

function getStrength(requirements: requirementsType[], password: string) {
  let multiplier = password.length > 5 ? 0 : 1;

  requirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
}

export default function Signup() {
  const t = useTranslations("SignUp");

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : t("invalidEmail")),
    },
  });

  const requirements = [
    { re: /[0-9]/, label: t("includesNumber") },
    { re: /[a-z]/, label: t("includesLowercaseLetter") },
    { re: /[A-Z]/, label: t("includesUppercaseLetter") },
  ];

  const [popoverOpened, setPopoverOpened] = useState(false);
  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement
      key={index}
      label={requirement.label}
      meets={requirement.re.test(form.values.password)}
    />
  ));
  const strength = getStrength(requirements, form.values.password);
  const color = strength === 100 ? "teal" : strength > 50 ? "yellow" : "red";
    console.log(form.values.username);
  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        {t("title")}
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        {t("subTitle")}{" "}
        <Anchor size="sm" component="button">
          {t("login")}
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput
          label={t("username")}
          placeholder="John Smith"
          required
          key={form.key("username")}
          {...form.getInputProps("username")}
        />
        <TextInput
          label={t("email")}
          placeholder="john.smith@example.com"
          required
          key={form.key("email")}
          {...form.getInputProps("email")}
        />
        <Popover
          opened={popoverOpened}
          position="bottom"
          width="target"
          transitionProps={{ transition: "pop" }}
        >
          <Popover.Target>
            <div
              onFocusCapture={() => setPopoverOpened(true)}
              onBlurCapture={() => setPopoverOpened(false)}
            >
              <PasswordInput
                withAsterisk
                label={t("yourPassword")}
                placeholder={t("yourPassword")}
                key={form.key("password")}
                {...form.getInputProps("password")}
              />
            </div>
          </Popover.Target>
          <Popover.Dropdown>
            <Progress color={color} value={strength} size={5} mb="xs" />
            <PasswordRequirement
              label={t("includesAtLeastSixCharacters")}
              meets={form.values.password.length > 5}
            />
            {checks}
          </Popover.Dropdown>
          <PasswordInput
            withAsterisk
            label={t("confirmPassword")}
            placeholder={t("confirmPassword")}
            key={form.key("confirmPassword")}
            {...form.getInputProps("confirmPassword")}
          />
        </Popover>

        <Button fullWidth mt="xl">
          {t("signUp")}
        </Button>
      </Paper>
    </Container>
  );
}

"use client";
import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Button,
  Center,
} from "@mantine/core";
import { isEmail, matchesField, useForm } from "@mantine/form";
import classes from "./signup.module.css";
import { useTranslations } from "next-intl";
import { passwordStrength } from "check-password-strength";

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
      email: isEmail(t("invalidEmail")),
      password: (value) =>
        passwordStrength(value).id < 1 ? t("passwordTooWeak") : null,
      confirmPassword: matchesField('password', t("passwordDoesNotMatch"))
    },
  });

  return (
    <Center maw="100%" h="80vh">
      <Container size={420} my={40}>
        <form
          onSubmit={form.onSubmit((values) => console.log(values.password))}
        >
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
            <PasswordInput
              withAsterisk
              label={t("yourPassword")}
              placeholder={t("yourPassword")}
              key={form.key("password")}
              {...form.getInputProps("password")}
            />
            <PasswordInput
              withAsterisk
              label={t("confirmPassword")}
              placeholder={t("confirmPassword")}
              key={form.key("confirmPassword")}
              {...form.getInputProps("confirmPassword")}
            />
            <Button fullWidth mt="xl" type="submit">
              {t("signUp")}
            </Button>
          </Paper>
        </form>
      </Container>
    </Center>
  );
}

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
  Stack,
} from "@mantine/core";
import { isEmail, matchesField, useForm } from "@mantine/form";
import classes from "./signup.module.css";
import { useTranslations } from "next-intl";
import { passwordStrength } from "check-password-strength";
import { API_URL } from "@/config/config";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function Signup() {
  const t = useTranslations("SignUp");
  const route = useRouter();

  const [loading, setLoading] = useState(false);
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
      confirmPassword: matchesField("password", t("passwordDoesNotMatch")),
    },
  });

  const postSignupData = async (values: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    setLoading(true);
    const response = await fetch(API_URL + "/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: values.username,
        email: values.email,
        password: values.password,
      }),
    });

    const result = await response.json();

    if (response.status === 201) {
      route.push("/dashboard");
    } else if (result.msg === "This email already been used.") {
      form.setErrors({ email: t("thisEmailAlreadyBeenUsed") });
      setLoading(false);
    } else {
      notifications.show({
        title: t("unknownErrorOccurred"),
        message: result.msg,
        color: "red",
      });
      setLoading(false);
    }
  };

  return (
    <Center maw="100%" h="80vh">
      <Container size={420} my={40} w={"600px"}>
        <form onSubmit={form.onSubmit((values) => postSignupData(values))}>
          <Title ta="center" className={classes.title}>
            {t("title")}
          </Title>
          <Text c="dimmed" size="sm" ta="center" mt={5}>
            {t("subTitle")}{" "}
            <Link href="/login">
            <Anchor size="sm" component="button">
              {t("login")}
            </Anchor>
            </Link>
          </Text>

          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <Stack align="stretch" justify="flex-start" gap="lg">
              <TextInput
                label={t("username")}
                placeholder="John Smith"
                required
                disabled={loading}
                key={form.key("username")}
                {...form.getInputProps("username")}
              />
              <TextInput
                label={t("email")}
                placeholder="john.smith@example.com"
                required
                disabled={loading}
                key={form.key("email")}
                {...form.getInputProps("email")}
              />
              <PasswordInput
                withAsterisk
                label={t("yourPassword")}
                placeholder={t("yourPassword")}
                disabled={loading}
                key={form.key("password")}
                {...form.getInputProps("password")}
              />
              <PasswordInput
                withAsterisk
                label={t("confirmPassword")}
                placeholder={t("confirmPassword")}
                disabled={loading}
                key={form.key("confirmPassword")}
                {...form.getInputProps("confirmPassword")}
              />
            </Stack>
            <Button fullWidth mt="xl" type="submit" disabled={loading}>
              {t("signUp")}
            </Button>
          </Paper>
        </form>
      </Container>
    </Center>
  );
}

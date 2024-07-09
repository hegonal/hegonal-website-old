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
import classes from "./login.module.css";
import { useTranslations } from "next-intl";
import { API_URL } from "@/config/config";
import { useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import Link from "next/link";

export default function Signup() {
  const t = useTranslations("Login");

  const [loading, setLoading] = useState(false);
  const route = useRouter();
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: isEmail(t("invalidEmail")),
    },
  });

  const postLoginData = async (values: { email: string; password: string }) => {
    setLoading(true);
    const response = await fetch(API_URL + "/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
      }),
    });

    const result = await response.json();

    if (response.status === 200) {
      route.push("/dashboard");
    } else if (response.status === 401) {
      form.setErrors({
        email: t("invalidEmailOrPassword"),
        password: t("invalidEmailOrPassword"),
      });
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
        <form onSubmit={form.onSubmit((values) => postLoginData(values))}>
          <Title ta="center" className={classes.title}>
            {t("title")}
          </Title>
          <Text c="dimmed" size="sm" ta="center" mt={5}>
            {t("subTitle")}{" "}
            <Link href="/signup">
            <Anchor size="sm" component="button">
              {t("register")}
            </Anchor>
            </Link>
          </Text>

          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <Stack align="stretch" justify="flex-start" gap="lg">
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
                label={t("password")}
                placeholder={t("password")}
                disabled={loading}
                key={form.key("password")}
                {...form.getInputProps("password")}
              />
            </Stack>
            <Button fullWidth mt="xl" type="submit" disabled={loading}>
              {t("login")}
            </Button>
          </Paper>
        </form>
      </Container>
    </Center>
  );
}

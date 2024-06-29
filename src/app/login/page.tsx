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
import classes from "./login.module.css";
import { useTranslations } from "next-intl";

export default function Signup() {
  const t = useTranslations("Login");

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
              {t("register")}
            </Anchor>
          </Text>

          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <TextInput
              label={t("email")}
              placeholder="john.smith@example.com"
              required
              key={form.key("email")}
              {...form.getInputProps("email")}
            />
            <PasswordInput
              withAsterisk
              label={t("password")}
              placeholder={t("password")}
              key={form.key("password")}
              {...form.getInputProps("password")}
            />
            <Button fullWidth mt="xl" type="submit">
              {t("login")}
            </Button>
          </Paper>
        </form>
      </Container>
    </Center>
  );
}

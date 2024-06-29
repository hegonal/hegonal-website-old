"use client";
import {
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Button,
  Center,
  PinInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import classes from "./two-factor.module.css";
import { useTranslations } from "next-intl";

export default function Signup() {
  const t = useTranslations("TwoFactor");

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      pin: "",
    },
  });

  return (
    <Center maw="100%" h="80vh">
      <Container size={420} my={40}>
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
          <Title ta="center" className={classes.title}>
            {t("title")}
          </Title>
          <Text c="dimmed" size="sm" ta="center" mt={5}>
            {t("subTitle")}
          </Text>

          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <Center>
              <PinInput
                length={6}
                key={form.key("pin")}
                type="number" 
                {...form.getInputProps("pin")}
              />
            </Center>
            <Button fullWidth mt="xl" type="submit">
              {t("verify")}
            </Button>
          </Paper>
        </form>
      </Container>
    </Center>
  );
}

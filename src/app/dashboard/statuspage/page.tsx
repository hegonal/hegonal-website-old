"use client";
import { Avatar, Group, Paper, Stack, Title, Text } from "@mantine/core";
import { useTranslations } from "next-intl";
import { tempData } from "./data";
import { useRouter } from "next/navigation";

export default function AddMonitor() {
  const t = useTranslations("Monitor");
 const router = useRouter()
  return (
    <Stack align="stretch" justify="center" gap="md">
            {tempData.map((item) => (
              <Paper
                style={{
                  cursor: "pointer",
                }}
                key={item.id}
                shadow="xs"
                radius="md"
                withBorder
                p="xs"
                onClick={() => router.push("/dashboard/statuspage/" + item.id)}
              >
                <Group>
                  <Avatar size="xl" src={item.icon}></Avatar>
                  <Stack>
                    <Title order={2}>{item.name}</Title>
                    <Text size="lg" c="dimmed">{item.url}</Text>
                  </Stack>
                </Group>
              </Paper>
            ))}
    </Stack>
  );
}

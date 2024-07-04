"use client";
import React from "react";
import {
  Group,
  Text,
  Paper,
  Stack,
  Title,
  Badge,
  Flex,
  ScrollArea,
  DEFAULT_THEME,
  Button,
  ActionIcon,
} from "@mantine/core";
import { useTranslations } from "next-intl";
import classes from "./monitor.module.css";
import { usePathname, useRouter } from "next/navigation";
import { useMediaQuery } from "@mantine/hooks";
import { IoAddCircle } from "react-icons/io5";
import { tempData } from "./data";

export default function MonitorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations("Monitor");
  const router = useRouter();
  const pathname = usePathname();
  const mdBreakpoint = DEFAULT_THEME.breakpoints.md;

  const isSmallerThanMd = useMediaQuery(`(max-width: ${mdBreakpoint})`);

  return (
    <Flex
      gap="xs"
      justify="flex-start"
      align="flex-start"
      direction="row"
      wrap="nowrap"
    >
      <Paper
        h={"calc(100vh - 95px)"}
        w={{ base: "100%", md: "90%", lg: "80%", xl: "60%" }}
        hidden={
          isSmallerThanMd &&
          !pathname.endsWith("monitor/") &&
          !pathname.endsWith("monitor")
        }
      >
        <ScrollArea type="scroll" h={"calc(100vh - 95px)"}>
          <Stack>
            <Button fullWidth leftSection={<IoAddCircle size={15}/>} variant="default">
              {t("addMonirot")}
            </Button>
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
                w={"100%"}
                onClick={() => router.push("/dashboard/monitor/" + item.id)}
              >
                <Stack gap="xs">
                  <Group justify="space-between" grow>
                    <Stack gap="0px">
                      <Title order={4} lineClamp={1}>
                        {item.name}
                      </Title>
                      <Text c="dimmed" size="sm" truncate="end">
                        {item.description}
                      </Text>
                    </Stack>
                    <Flex justify="flex-end" align="center" w={"10%"}>
                      <Badge
                        color={item.status === 1 ? "green" : "red"}
                        size="md"
                      >
                        {item.status === 1 ? "100%" : "90.1%"}
                      </Badge>
                    </Flex>
                  </Group>
                  <Group gap={"1px"} w="100%" grow>
                    {[...Array(90)].map((_, index) => (
                      <span key={index} className={classes.uptimeDot}></span>
                    ))}
                  </Group>
                </Stack>
              </Paper>
            ))}
          </Stack>
        </ScrollArea>
      </Paper>
      <Paper
        w="100%"
        hidden={
          isSmallerThanMd &&
          (pathname.endsWith("monitor") || pathname.endsWith("monitor/"))
        }
      >
        {children}
      </Paper>
    </Flex>
  );
}

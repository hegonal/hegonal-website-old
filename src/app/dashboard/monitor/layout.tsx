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
} from "@mantine/core";
import { useTranslations } from "next-intl";
import classes from "./monitor.module.css";
import { usePathname, useRouter } from "next/navigation";
import { useMediaQuery } from "@mantine/hooks";

// 1 = up 2 = down 3 = maintain
const tempData = [
  {
    id: "123456",
    name: "Server A",
    description: "Production server",
    status: 1,
  },
  { id: "123457", name: "Server B", description: "Backup server", status: 2 },
  { id: "123458", name: "Website", description: "Frontend server", status: 1 },
  { id: "123459", name: "Database", description: "Data storage", status: 2 },
  {
    id: "123460",
    name: "API Gateway",
    description: "Backend API service",
    status: 1,
  },
  {
    id: "123461",
    name: "Load Balancer",
    description: "Traffic distribution",
    status: 1,
  },
  {
    id: "123462",
    name: "Cache Server",
    description: "Caching system",
    status: 1,
  },
  {
    id: "123463",
    name: "Monitoring Service",
    description: "Health check service",
    status: 1,
  },
  {
    id: "123464",
    name: "Notification Service",
    description: "Alerting service",
    status: 2,
  },
  {
    id: "123465",
    name: "Logging Server",
    description: "Log management",
    status: 1,
  },
  {
    id: "123466",
    name: "Email Server",
    description: "Email delivery service",
    status: 1,
  },
  {
    id: "123467",
    name: "Backup Storage",
    description: "Data backup solution",
    status: 2,
  },
  {
    id: "123468",
    name: "Authentication Service",
    description: "User authentication",
    status: 1,
  },
  {
    id: "123469",
    name: "Search Engine",
    description: "Full-text search service",
    status: 2,
  },
  {
    id: "123470",
    name: "Dashboard",
    description: "Monitoring dashboard",
    status: 1,
  },
  {
    id: "123471",
    name: "Billing System",
    description: "Payment processing",
    status: 1,
  },
  {
    id: "123472",
    name: "Analytics Platform",
    description: "Data analysis tool",
    status: 1,
  },
  {
    id: "123473",
    name: "File Storage",
    description: "File hosting service",
    status: 1,
  },
  {
    id: "123474",
    name: "Task Scheduler",
    description: "Job scheduling service",
    status: 2,
  },
  {
    id: "123475",
    name: "Customer Support",
    description: "Helpdesk system",
    status: 1,
  },
  {
    id: "123476",
    name: "Backup Server C",
    description: "Secondary backup server",
    status: 2,
  },
  {
    id: "123477",
    name: "Content Delivery Network",
    description: "CDN service",
    status: 1,
  },
  {
    id: "123478",
    name: "API Service 2",
    description: "Additional API endpoint",
    status: 1,
  },
  {
    id: "123479",
    name: "Payment Gateway",
    description: "Transaction processing",
    status: 2,
  },
  {
    id: "123480",
    name: "Database Cluster",
    description: "Distributed database",
    status: 1,
  },
  {
    id: "123481",
    name: "Load Testing Service",
    description: "Performance testing",
    status: 1,
  },
  {
    id: "123482",
    name: "Backup Generator",
    description: "Power backup system",
    status: 1,
  },
  {
    id: "123483",
    name: "API Gateway 2",
    description: "Secondary API service",
    status: 1,
  },
  {
    id: "123484",
    name: "DNS Server",
    description: "Domain name resolution",
    status: 1,
  },
  {
    id: "123485",
    name: "VoIP Service",
    description: "Voice over IP",
    status: 2,
  },
  {
    id: "123486",
    name: "Data Warehouse",
    description: "Big data storage",
    status: 1,
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations("Dashboard");
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

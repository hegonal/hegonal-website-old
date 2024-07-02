"use client";
import {
  Badge,
  Checkbox,
  Flex,
  Group,
  MultiSelect,
  NumberInput,
  ScrollArea,
  Select,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { AreaChart } from "@mantine/charts";
import { data } from "./data";
import { useTranslations } from "next-intl";

export default function Signup() {
  const t = useTranslations("Monitor")

  return (
    <ScrollArea type="scroll" h={"calc(100vh - 95px)"}>
      <Stack align="flex-start" justify="flex-start" gap="md" w={"100%"}>
        <Group justify="space-between" grow w={"calc(100% - 15px)"}>
          <Stack gap="0px">
            <Title order={4} lineClamp={1}>
              Hetzner server
            </Title>
            <Text c="dimmed" size="sm" truncate="end">
              This is just a hetzner vps 8gb ram 4vcpu
            </Text>
          </Stack>
          <Flex justify="flex-end" align="center" w={"10%"}>
            <Badge color="green" size="md">
              100%
            </Badge>
          </Flex>
        </Group>

        <AreaChart
          type="split"
          h={200}
          data={data}
          dataKey="date"
          strokeWidth={1}
          series={[{ name: "ping", color: "green" }]}
          withXAxis={false}
          w={"100%"}
        />
        <Stack gap={"xs"} w={"100%"}>
          <Title order={4}>{t("general")}</Title>
          <TextInput label={t("monitorName")} placeholder={t("yourMonitorName")} />
          <TextInput
            label={t("monitorDescription")}
            placeholder={t("yourMonitorDescription")}
          />
          <Select
            label={t("monitorType")}
            placeholder={t("chooseYoutMonitorType")}
            data={["Http(s)", "Ping"]}
          />
          <TextInput label="Url" placeholder="Input url" />
          <Title order={4}>{t("advance")}</Title>
          <NumberInput
            label={t("heartbeatInterval")}
          />
          <NumberInput label={t("retries")} />
          <NumberInput
            label={t("heartRetryInterval")}
          />
          <NumberInput
            label={t("requestTimeout")}
          />
          <NumberInput
            label={t("resendNotification")}
          />
          <Checkbox
            defaultChecked
            label={t("certificateExpiryNotification")}
          />
          <Checkbox
            defaultChecked
            label={t("ignoreSSLError")}
          />
          <Checkbox defaultChecked label={t("upsideDownMode")} />
          <NumberInput label={t("maxRedirects")} />
          <MultiSelect
            label={t("acceptedStatusCodes")}
            data={["200-299", "100-199", "300-399", "400-499", "500-599"]}
          />
        </Stack>
      </Stack>
    </ScrollArea>
  );
}

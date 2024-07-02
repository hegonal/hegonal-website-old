"use client";
import {
  Badge,
  Button,
  Checkbox,
  Divider,
  Flex,
  Grid,
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
import { modals } from "@mantine/modals";

export default function Signup() {
  const t = useTranslations("Monitor");

  const openDeleteModal = () =>
    modals.openConfirmModal({
      title: t("deleteMonitor"),
      children: (
        <Text size="sm">
          {t("deleteMonitorContent")}
        </Text>
      ),
      labels: { confirm: t("confirm"), cancel: t("cancel") },
      confirmProps: { color: "red" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => console.log("Confirmed"),
    });

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
        <Stack w={"100%"}>
          <Title order={4}>{t("general")}</Title>
          <Grid>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <TextInput
                label={t("monitorName")}
                placeholder={t("yourMonitorName")}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <TextInput
                label={t("monitorDescription")}
                placeholder={t("yourMonitorDescription")}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6 }}>
              <Select
                label={t("monitorType")}
                placeholder={t("chooseYoutMonitorType")}
                data={["Http(s)", "Ping"]}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6 }}>
              <TextInput label="Url" placeholder="Input url" />
            </Grid.Col>
          </Grid>
          <Title order={4}>{t("advance")}</Title>
          <Grid>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <NumberInput label={t("heartbeatInterval")} />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <NumberInput label={t("retries")} />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <NumberInput label={t("heartRetryInterval")} />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <NumberInput label={t("requestTimeout")} />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <NumberInput label={t("resendNotification")} />
            </Grid.Col>
            <Grid.Col span={{ base: 12 }}>
              <Checkbox
                defaultChecked
                label={t("certificateExpiryNotification")}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12 }}>
              <Checkbox defaultChecked label={t("ignoreSSLError")} />
            </Grid.Col>
            <Grid.Col span={{ base: 12 }}>
              <Checkbox defaultChecked label={t("upsideDownMode")} />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <NumberInput label={t("maxRedirects")} />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <MultiSelect
                label={t("acceptedStatusCodes")}
                data={["200-299", "100-199", "300-399", "400-499", "500-599"]}
              />
            </Grid.Col>
          </Grid>
          <Title c="red" order={4}>
            {t("dangerZone")}
          </Title>
          <Button onClick={openDeleteModal} color="red" maw={"150px"}>
            {t("deleteMonitor")}
          </Button>
        </Stack>
      </Stack>
    </ScrollArea>
  );
}

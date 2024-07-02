"use client";
import {
  Button,
  Checkbox,
  Divider,
  Grid,
  MultiSelect,
  NumberInput,
  ScrollArea,
  Select,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { useTranslations } from "next-intl";

export default function AddMonitor() {
  const t = useTranslations("Monitor");

  return (
    <ScrollArea type="scroll" h={"calc(100vh - 95px)"}>
        <Title order={2}>{t("createNewMonitor")}</Title>
        <Divider />
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
              <NumberInput label={t("heartbeatInterval", {sec: 1})} />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <NumberInput label={t("retries")} />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <NumberInput label={t("heartRetryInterval", {sec: 1})} />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <NumberInput label={t("requestTimeout",{sec: 1})} />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <NumberInput label={t("resendNotification", {downTimes: 1})} />
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
          <Button fullWidth>
            {t("createNewMonitor")}
          </Button>
        </Stack>
    </ScrollArea>
  );
}

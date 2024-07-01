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

export default function Signup() {

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
          <Title order={4}>General</Title>
          <TextInput label="Monitor name" placeholder="Your monitor name" />
          <TextInput
            label="Monitor description"
            placeholder="Your monitor description"
          />
          <Select
            label="Monitor type"
            placeholder="Pick value"
            data={["Http(s)", "Ping"]}
          />
          <TextInput label="Url" placeholder="Input url" />
          <Title order={4}>Advance</Title>
          <NumberInput
            label="Heartbeat Interval (Check every 60 seconds)"
            placeholder="Heartbeat Interval"
          />
          <NumberInput label="Retries" placeholder="Retries" />
          <NumberInput
            label="Heartbeat Retry Interval (Retry every 60 seconds)"
            placeholder="Heartbeat Retry Interval"
          />
          <NumberInput
            label="Request Timeout (Timeout after 48 seconds)"
            placeholder="Request Timeout "
          />
          <NumberInput
            label="Resend Notification if Down X times consecutively (Resend disabled)"
            placeholder="Resend Notification if Down X times consecutively"
          />
          <Checkbox
            defaultChecked
            label="Certificate Expiry Notification
"
          />
          <Checkbox
            defaultChecked
            label="Ignore TLS/SSL error for HTTPS websites
"
          />
          <Checkbox defaultChecked label="Upside Down Mode" />
          <NumberInput label="Max. Redirects" placeholder="Max. Redirects" />
          <MultiSelect
            label="Accepted Status Codes"
            placeholder="Accepted Status Codes"
            data={["200-299", "100-199", "300-399", "400-499", "500-599"]}
          />
        </Stack>
      </Stack>
    </ScrollArea>
  );
}

import Image from "next/image";
import { PasswordInput, Stack } from '@mantine/core';
export default function Home() {
  return (
    <Stack>
      <PasswordInput
        label="Password"
        defaultValue="secret"
      />
      <PasswordInput
        label="Confirm password"
        defaultValue="secret"
      />
    </Stack>
  );
}

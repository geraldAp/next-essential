import { toast } from "sonner";

export function handleSuccess({ message }: { message: string }) {
  toast("Success", {
    description: <span style={{ color: "#067C3C" }}>{message}</span>,
    style: {
      borderColor: "#067C3C1A",
      color: "#067C3C",
    },
    cancel: {
      label: "Close",
      onClick: () => {},
    },
  });
}

export function handleError({ message }: { message: string }) {
  toast("Error", {
    description: <span style={{ color: "#DC2626" }}>{message}</span>,
    style: {
      borderColor: "#DC26261A",
      color: "#DC2626",
    },
    cancel: {
      label: "Close",
      onClick: () => {},
    },
  });
}

export function handleWarning({ message }: { message: string }) {
  toast("Warning", {
    description: <span style={{ color: "#B45309" }}>{message}</span>,
    style: {
      borderColor: "#B453091A",
      color: "#B45309",
    },
    cancel: {
      label: "Close",
      onClick: () => {},
    },
  });
}



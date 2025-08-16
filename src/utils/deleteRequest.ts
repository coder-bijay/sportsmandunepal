import { useState } from "react";
import { isAuthenticated } from "./isAuthenticated";
import axios from "axios";

interface DeleteResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export const useDeleteRequest = ({
  url,
  afterSuccess,
}: {
  url: string;
  afterSuccess?: () => void;
}) => {
  const [success, setSuccess] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { token } = isAuthenticated();

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const deleteData = async (values: { id: string }) => {
    if (!url || !values?.id) return;

    setLoading(true);
    try {
      const { data: response } = await axios.delete<DeleteResponse>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/${url}/${values.id}`,
        config
      );

      afterSuccess?.();

      if (response.success) {
        setSuccess("Successfully updated");
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error ?? "Unknown server error");
      } else {
        setError("Unexpected error occurred");
      }
      setSuccess("");
    } finally {
      setLoading(false);
    }
  };

  return { deleteData, success, error, setError, loading };
};

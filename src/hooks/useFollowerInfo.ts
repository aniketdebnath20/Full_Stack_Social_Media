import kyInstance from "@/lib/ky";
import { FollowerInfo } from "@/lib/type";
import { useQuery } from "@tanstack/react-query";

export default function useFollowerInfo(
  userId: string,
  initiaState: FollowerInfo,
) {
  const query = useQuery({
    queryKey: ["follower-info", userId],
    queryFn: () =>
      kyInstance.get(`api/users/${userId}/followers`).json<FollowerInfo>(),
    initialData: initiaState,
    staleTime: Infinity,
  });

  return query;
}

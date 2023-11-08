import type { User } from "@firebase/auth"
import { getUsers } from "../utils/apis/cloudFunctions"
import { useQuery } from "@tanstack/react-query"

// TODO: Pagination

const useUsers = (user?: User | null, pageToken?: string) => {
  if (!user) throw new Error("No user provided")
  return useQuery({
    queryKey: ["users", { uid: user.uid }],
    queryFn: () => getUsers(user, pageToken),
  })
}

export default useUsers

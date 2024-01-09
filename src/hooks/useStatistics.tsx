import { useQuery } from "@tanstack/react-query"
import { generateStatistics } from "../utils/apis/cloudFunctions"

const useStatistics = () => {
  return useQuery({
    queryKey: ["statistics"],
    queryFn: () => generateStatistics(),
  })
}

export default useStatistics

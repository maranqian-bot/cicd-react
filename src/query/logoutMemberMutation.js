import { useMutation } from "@tanstack/react-query"
import useUserStore from "../store/userStore"
import { logoutMemberApi } from "../api/memberApi"

export const useLogoutMemberMutation = () => {
    const { logout } = useUserStore();

    return useMutation({
        mutationFn: logoutMemberApi,
        onSuccess:(data) => {
            // store에 있는 currentUser를 null로 변경
            logout();
        }
    })
}
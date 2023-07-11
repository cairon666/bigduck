import { useAppSelector } from "@/shared/hooks";

export const useLoginViewer = () => useAppSelector((state) => state.auth.login);
export const useRegisterViewer = () => useAppSelector((state) => state.auth.register);
export const useRecoverPasswordViewer = () => useAppSelector((state) => state.auth.recoverPassword);

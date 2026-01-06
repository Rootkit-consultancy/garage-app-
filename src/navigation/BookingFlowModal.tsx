import { useEffect } from "react";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "./types";
import { BookingFlowNavigator } from "./BookingFlowNavigator";
import { useAppDispatch } from "../store/hooks";
import { startDraft } from "../store/slices/bookingsSlice";

type Props = NativeStackScreenProps<RootStackParamList, "BookingFlow">;

export function BookingFlowModal({ route }: Props) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(startDraft({ mechanicId: route.params.mechanicId }));
  }, [dispatch, route.params.mechanicId]);

  return <BookingFlowNavigator />;
}


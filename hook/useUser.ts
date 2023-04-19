import { useAppSelector } from "../redux/hook";

const useUser = () => {
  const profile = useAppSelector(
    (state) => state?.loginSlice?.response?.user
  );
  const auth = useAppSelector(
    (state) => state?.loginSlice?.response?.user
  );

  let avatarName = "";
  let fullname = "";
  let email = "";

  // avatarName = profile != null ?  profile?.firstname![0] + " " +  profile?.lastname! })[0] : "";
  avatarName = profile != null ? profile?.photo! : "";

  fullname = profile != null ? profile?.name! : "";

  email = profile != null ? profile?.email! : "";


  return {
    fullname,
    avatarName,
    email
  };
};

export default useUser;

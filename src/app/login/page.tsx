"use client";
import InputComponent from "@/component/formElements/inputComponent";
import SelectComponent from "@/component/formElements/selectComponent";
import Notification from "@/component/Notification";
import { GlobalContext } from "@/context";
import connectToDB from "@/database";
import { login } from "@/services/login";
import Cookies from "js-cookie";

import { loginFormcontrols, registrationFormControls } from "@/utils";
import { useRouter } from "next/navigation";
import { FC, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import ComponentLevelLoader from "@/component/loader/componentlevel";
interface FormDataProps {
  email: string;
  password: string;
}
const initialFormData = {
  email: "",
  password: "",
};
type FormDataKeys = keyof FormDataProps;

const Login: FC = () => {
  const [formData, setFormData] = useState<FormDataProps>(initialFormData);
  const [isRegistered, setIsRegistered] = useState(false);
  const {
    user,
    setUser,
    setIsAuthUser,
    isAuthUser,
    componentLevelLoader,
    setComponentLevelLoader,
  } = useContext(GlobalContext);
  const router = useRouter();
  function formValid() {
    return formData &&
      formData.email &&
      formData.email.trim() !== "" &&
      formData.password &&
      formData.password.trim() !== ""
      ? true
      : false;
  }

  async function handleRegisterOnSubmit() {
    setComponentLevelLoader({ loading: true, id: "" });
    const res = await login(formData);
    if (res.success) {
      toast.success(res.message, { position: "top-right" });
      setIsAuthUser(true);
      setUser(res?.finalData?.user);
      setFormData(initialFormData);
      Cookies.set("token", res?.finalData?.token);
      localStorage.setItem("user", JSON.stringify(res?.finalData?.user));
      setComponentLevelLoader({ loading: false, id: "" });
    } else {
      setIsAuthUser(false);
      toast.error(res.message, { position: "top-right" });
      setComponentLevelLoader({ loading: false, id: "" });
    }
  }
  useEffect(() => {
    if (isAuthUser) router.push("/");
  }, [isAuthUser]);

  return (
    <div className=" bg-white relative">
      <div className="flex items-center rounded-xl justify-between pt-0 pr-10 pb-0 pl-10 mb-2 mt-8 mr-auto xl:px-5 lg:flex-row  ">
        <div className="flex  flex-col justify-center items-center w-full pr-10 pl-10 lg:flex-row">
          <div className="w-full  mt-10 mr-0 mb-0 ml-0 relative max-w-2xl lg:mt-0 lg:w-5/12">
            <div className="flex flex-col items-center justify-start  pt-10 pr-10 pl-10 bg-white shadow-2xl roundex-xl relative">
              <p className="text-2xl text-black">Login</p>
              <div className="w-full mt-6 mr-0 mb-0 ml-0 relat space-y-8">
                {loginFormcontrols.map((formInput) =>
                  formInput.componentType === "input" ? (
                    /* placeholder, value, onChange, type */
                    <InputComponent
                      label={formInput.label}
                      placeholder={formInput.placeholder}
                      key={formInput.id}
                      type={formInput.type}
                      onChange={(event) =>
                        setFormData({
                          ...formData,
                          [formInput.id]: event.target.value,
                        })
                      }
                      value={formData[formInput.id as FormDataKeys]}
                    />
                  ) : null
                )}
                <button
                  className="disabled:opacity-50 mb-3 inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg 
                   text-white rounded-xl transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide
                    "
                  disabled={!formValid()}
                  onClick={handleRegisterOnSubmit}
                >
                  {componentLevelLoader && componentLevelLoader.loading ? (
                    <ComponentLevelLoader
                      text="Loggin in"
                      color={"#ffffff"}
                      loading={
                        componentLevelLoader && componentLevelLoader?.loading
                      }
                    />
                  ) : (
                    "Login"
                  )}
                </button>
                <div className="flex flex-col gap-2">
                  <p>New to Website</p>
                  <button
                    onClick={() => router.push("/register")}
                    className="inline-flex w-full justify-center items-center bg-black px-6 py-4 text-lg
                  text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide rounded-xl mb-2 "
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Notification />
    </div>
  );
};

export default Login;

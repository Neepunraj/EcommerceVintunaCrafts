"use client";
import InputComponent from "@/component/formElements/inputComponent";
import SelectComponent from "@/component/formElements/selectComponent";
import ComponentLevelLoader from "@/component/loader/componentlevel";
import Notification from "@/component/Notification";
import { GlobalContext, GlobalContextType } from "@/context";
import { UserDataProps, UserDataPropsWithoutID } from "@/interfaces";
import { registerAccount } from "@/services/register";
import { registrationFormControls } from "@/utils";
import { useRouter } from "next/navigation";
import { FC, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const initialFormData = {
  name: "",
  email: "",
  password: "",
  role: "costumer",
};
type FormDataKeys = keyof UserDataPropsWithoutID;

const Register: FC = () => {
  const [formData, setFormData] = useState<UserDataProps>(initialFormData);
  const [isRegistered, setIsRegistered] = useState(false);
  const { pagelevelLoader, setPageLevelLoader, isAuthUser } =
    useContext(GlobalContext);
  const router = useRouter();
  function formValid() {
    return formData &&
      formData.name &&
      formData.name.trim() !== "" &&
      formData.email &&
      formData.email.trim() !== "" &&
      formData.password &&
      formData.password.trim() !== ""
      ? true
      : false;
  }

  async function handleRegisterOnSubmit() {
    setPageLevelLoader(true);
    try {
      const data = await registerAccount(formData);
      if (data.success) {
        setPageLevelLoader(true);
        toast.success(data.message, {
          position: "top-right",
        });
        setIsRegistered(true);
        setFormData(initialFormData);
      } else {
        toast.error(data.message, { position: "top-right" });
        setPageLevelLoader(false);
      }
    } catch (error: any) {
      toast.error(error.message, { position: "top-right" });
      setPageLevelLoader(false);
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
              <p className="text-2xl text-black">
                {isRegistered
                  ? "Registration successful"
                  : "Sign up for an Account"}{" "}
              </p>
              {isRegistered ? (
                <button
                  onClick={() => router.push("/login")}
                  className="inline-flex w-full items-center justify-center bg-black *:px-6 py-4 text-lg 
                text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide"
                >
                  Login
                </button>
              ) : (
                <div className="w-full mt-6 mr-0 mb-0 ml-0 relat space-y-8">
                  {registrationFormControls.map((formInput) =>
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
                    ) : formInput.componentType === "select" ? (
                      <SelectComponent
                        label={formInput.label}
                        key={formInput.id}
                        options={formInput.options}
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
                    {pagelevelLoader ? (
                      <ComponentLevelLoader
                        text="Registering"
                        color={"#ffffff"}
                        loading={pagelevelLoader}
                        size={10}
                      />
                    ) : (
                      "Register"
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Notification />
    </div>
  );
};

export default Register;

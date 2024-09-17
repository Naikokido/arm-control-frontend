import { Link } from "react-router-dom";
import { InputPassword } from "../components/ui/dataEntry/InputPassword.tsx";
import { Input } from "../components/ui/dataEntry/Input.tsx";
import { useState } from "react";
import { RiArrowRightLine } from "@remixicon/react";
import logoArmControl from "../assets/logo_arm_control.png";
export const LoginPage = () => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <>
      <div className=" flex min-h-full flex-1">
        <div className="relative hidden w-0 flex-1 lg:block">
          <div className="flex items-center content-center justify-center w-full h-full">
            <div className="bg-cover w-full h-full bg-sign-in brightness-50 contrast-100" />
            {/* <img
              className="absolute w-48 h-48"
              // src=""
              // alt="logo"
            /> */}
            <div className="absolute px-2 text-center text-white bottom-6">
              <p>{`©️ ${new Date().getFullYear()} Arm Control. Todos los derechos reservados | Politica de privacidad`}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <ul className="w-full">
                <li className="overflow-hidden rounded-xl border border-gray-200">
                  <div className="flex flex-col items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-4">
                    <div className="flex items-center text-lg font-bold leading-6 text-gray-900">
                      <img
                        className="w-5 h-5 mr-2"
                        src={logoArmControl}
                        alt="logo"
                      />
                      Arm Control
                    </div>
                  </div>
                  <dl className="-my-3 px-6 py-4 text-sm leading-6">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm mt-4">
                      <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 font-family-inter">
                        Iniciar sesión
                      </h2>
                    </div>

                    <div className="flex py-3">
                      <div className="mt-1 sm:mx-auto sm:w-full sm:max-w-sm">
                        <div className="space-y-6">
                          <div>
                            <form method="post">
                              <Input
                                id="username"
                                placeholder="correo.example@gmail.com"
                                label="Username"
                                required
                                maxLength={10}
                              />
                              <InputPassword
                                id="password"
                                placeholder="Ingrese la contraseña..."
                                label="Contraseña"
                                required
                                autoComplete="off"
                              />
                              <div className="flex flex-col gap-4 mt-6">
                                <button
                                  type="submit"
                                  className={`inline-flex justify-center items-center gap-x-1.5 rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 ${
                                    loading
                                      ? "disabled:cursor-not-allowed disabled:bg-primary-400 disabled:text-white-500 disabled:ring-primary-200"
                                      : ""
                                  }`}
                                >
                                  Iniciar
                                  {!loading ? (
                                    <RiArrowRightLine
                                      aria-hidden="true"
                                      className="-mr-0.5 h-5 w-5"
                                    />
                                  ) : (
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="1em"
                                      height="1em"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        fill="currentColor"
                                        d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
                                        opacity="0.25"
                                      />
                                      <path
                                        fill="currentColor"
                                        d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"
                                      >
                                        <animateTransform
                                          attributeName="transform"
                                          dur="0.75s"
                                          repeatCount="indefinite"
                                          type="rotate"
                                          values="0 12 12;360 12 12"
                                        />
                                      </path>
                                    </svg>
                                  )}
                                </button>
                                <Link to="/">
                                  <button
                                    type="button"
                                    disabled={loading}
                                    className={`flex w-full justify-center rounded-md bg-red-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 ${
                                      loading
                                        ? "disabled:cursor-not-allowed disabled:bg-red-400 disabled:text-white-500 disabled:ring-red-200"
                                        : ""
                                    }`}
                                  >
                                    Volver
                                  </button>
                                </Link>
                              </div>
                            </form>
                          </div>
                        </div>

                        <p className="mt-10 text-center text-sm text-gray-500 mb-10">
                          ¿No estás registrado?{" "}
                          <Link
                            to="#"
                            className="font-semibold leading-6 text-sky-600 hover:text-sky-500"
                          >
                            Regístrate aquí
                          </Link>
                        </p>
                      </div>
                    </div>
                  </dl>
                </li>
              </ul>
              {/* <div className="absolute text-center bottom-6">
                <img
                  style={{
                    width: "382px",
                    height: "72px",
                  }}
                  src=""
                  alt="logo-arm-control"
                />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

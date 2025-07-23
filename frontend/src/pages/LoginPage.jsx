import { useState } from "react";
import { motion } from "framer-motion";
import { FaLock } from "react-icons/fa";
import { AppIamges } from "../asset/assets";
import useLogin from "../hooks/useLogin";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  // This is how we did it first , without using the our custom hook
  // const queryClient = useQueryClient();
  // const {
  //   mutate: loginMutation,
  //   isPending,
  //   error,
  // } = useMutation({
  //   mutationFn: login,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["authUser"] });

  //   },
  // });

  const { isPending, error, loginMutation } = useLogin()

  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation(loginData);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-10">
      <motion.div
        className="bg-[#1c1c1e] text-white rounded-3xl shadow-2xl flex flex-col md:flex-row-reverse overflow-hidden w-full max-w-5xl"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Right Side Image (hidden on mobile) */}
        <motion.div
          className="bg-green-900 flex-1 hidden md:flex flex-col items-center justify-center p-6 md:p-10"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <img
            src={AppIamges.signup}
            alt="language app"
            className="w-52 md:w-64 mb-4 drop-shadow-xl"
          />
          <p className="text-center text-gray-100 text-sm md:text-base leading-relaxed">
            Connect with language partners worldwide. <br />
            Practice conversations, make friends, and improve your skills.
          </p>
        </motion.div>

        {/* Left Form Section */}
        <div className="flex-1 p-8 md:p-10">
          <motion.h1
            className="text-3xl font-bold text-green-400 flex items-center gap-2 justify-center mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Login <FaLock className="text-yellow-400" />
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-xl font-semibold text-center mb-1 text-green-500">
              Welcome Back to VibeChat
            </h2>
            <p className="text-sm text-center text-gray-400 mb-6">
              Sign in to continue your language journey
            </p>
          </motion.div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-600 text-white px-4 py-2 rounded-md text-sm mb-4 text-center">
              {error?.response?.data?.message || "Login failed. Please try again."}
            </div>
          )}

          {/* Login Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div>
              <label className="text-sm block mb-1">Email</label>
              <input
                name="email"
                type="email"
                placeholder="hello@example.com"
                className="w-full bg-[#2c2c2e] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                value={loginData.email}
                onChange={(e) =>
                  setLoginData({ ...loginData, email: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label className="text-sm block mb-1">Password</label>
              <input
                name="password"
                type="password"
                placeholder="••••••••"
                className="w-full bg-[#2c2c2e] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
                required
              />
            </div>

            <motion.button
              type="submit"
              disabled={isPending}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className={`w-full ${isPending ? "bg-green-300 cursor-not-allowed" : "bg-green-400"
                } text-black font-semibold py-3 rounded-lg transition`}
            >
              {isPending ? "Signing In..." : "Sign In"}
            </motion.button>
          </motion.form>

          <p className="text-center text-sm text-gray-400 mt-4">
            Don’t have an account?{" "}
            <a href="/signup" className="text-green-400 hover:underline">
              Create one
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;

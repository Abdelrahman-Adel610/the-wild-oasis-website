import Image from "next/image";
import { signInAction } from "../_lib/action";

function SignInButton() {
  return (
    <form className="flex flex-col gap-5" action={signInAction}>
      <button
        className="flex items-center gap-6 text-lg border border-primary-300 px-10 py-4 font-medium cursor-pointer hover:bg-accent-400 rounded-xl transition duration-100"
        name="provider"
        value="google"
        type="submit"
      >
        <Image
          src="https://authjs.dev/img/providers/google.svg"
          alt="Google logo"
          height="24"
          width="24"
        />
        <span>Continue with Google</span>
      </button>
      {/* GitHub button */}
      <button
        className="flex items-center gap-6 text-lg border border-primary-300 px-10 py-4 font-medium cursor-pointer hover:bg-accent-400 rounded-xl transition duration-100"
        name="provider"
        value="github"
      >
        <Image
          src="https://authjs.dev/img/providers/github.svg"
          alt="Github logo"
          height="24"
          width="24"
        />
        <span>Continue with GitHub</span>
      </button>
    </form>
  );
}

export default SignInButton;

export default function SdkInfoSection() {
  return (
    <section className="flex flex-col gap-10 rounded-3xl border border-zinc-200 bg-white p-10 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <p className="text-sm text-zinc-600 dark:text-zinc-300">
        The SDK exposes ready-to-use screens and an auth provider for quick
        integration. Follow the steps below to install and wire it into your app.
      </p>

      <div className="flex flex-col gap-8">
        <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 text-sm text-zinc-600 dark:border-zinc-800 dark:bg-black dark:text-zinc-300">
          <p className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
            SDK repositories
          </p>
          <div className="mt-3 space-y-2 text-xs">
            <p>
              SDK consumer example: {" "}
              <a
                className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-300"
                href="https://github.com/your-org/sdk-consumer-example"
                target="_blank"
                rel="noreferrer"
              >
                https://github.com/sgrpnwr/ragnify-sdk-consumer
              </a>
            </p>
            <p>
              Ragnify SDK repo: {" "}
              <a
                className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-300"
                href="https://github.com/your-org/ragnify-sdk"
                target="_blank"
                rel="noreferrer"
              >
                https://github.com/sgrpnwr/ragnify-sdk
              </a>
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-6 text-sm text-zinc-600 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
          <p className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
            Installation
          </p>
          <pre className="mt-4 rounded-xl bg-zinc-50 px-4 py-3 text-xs text-zinc-700 dark:bg-black dark:text-zinc-200">
npm install ragnify-ai-chatbot-sdk
          </pre>
          <pre className="mt-3 rounded-xl bg-zinc-50 px-4 py-3 text-xs text-zinc-700 dark:bg-black dark:text-zinc-200">
yarn add ragnify-ai-chatbot-sdk
          </pre>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-6 text-sm text-zinc-600 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
          <p className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
            Exports
          </p>
          <pre className="mt-4 whitespace-pre-wrap rounded-xl bg-zinc-50 px-4 py-3 text-xs text-zinc-700 dark:bg-black dark:text-zinc-200">
{`import {
  SapientAuthProvider,
  useSapientAuth,
  ChatScreen,
  DashboardScreen,
  LoginScreen,
  RegisterScreen,
} from "ragnify-ai-chatbot-sdk";`}
          </pre>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-6 text-sm text-zinc-600 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
          <p className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
            Provider usage
          </p>
          <pre className="mt-4 whitespace-pre-wrap rounded-xl bg-zinc-50 px-4 py-3 text-xs text-zinc-700 dark:bg-black dark:text-zinc-200">
{`import { SapientAuthProvider } from "ragnify-ai-chatbot-sdk";

export default function App() {
  return (
    <SapientAuthProvider
      baseUrl="https://api.example.com"
      apiKey="YOUR_KEY"
      organisationMetadata={{
        companyName: "Acme",
        companyMotto: "Knowledge at your fingertips",
        madeBy: "XYZ",
        companyLogo: require("./assets/company_logo.png"),
      }}
    >
      {/* app content */}
    </SapientAuthProvider>
  );
}`}
          </pre>
          <div className="mt-4 rounded-xl border border-dashed border-zinc-200 bg-zinc-50 px-4 py-3 text-xs text-zinc-600 dark:border-zinc-700 dark:bg-black dark:text-zinc-300">
            <p className="font-semibold text-zinc-900 dark:text-zinc-50">
              Provider props
            </p>
            <ul className="mt-2 space-y-1">
              <li>
                <span className="font-semibold">baseUrl:</span> API base URL.
              </li>
              <li>
                <span className="font-semibold">apiKey:</span> API key for requests.
              </li>
              <li>
                <span className="font-semibold">organisationMetadata?:</span>
                {" "}
                companyName, companyMotto, companyLogo, madeBy.
              </li>
            </ul>
          </div>
          <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">
            Add <span className="font-semibold">company_logo.png</span> to your app
            assets and pass it as <span className="font-semibold">companyLogo</span>.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-6 text-sm text-zinc-600 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
          <p className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
            Screen usage
          </p>
          <p className="mt-2 text-xs">
            Use the SDK-provided screens to handle auth, chat, and dashboards.
          </p>
          <div className="mt-4 space-y-4">
            <div>
              <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-50">
                LoginScreen
              </p>
              <pre className="mt-2 whitespace-pre-wrap rounded-xl bg-zinc-50 px-4 py-3 text-xs text-zinc-700 dark:bg-black dark:text-zinc-200">
{`<LoginScreen
  onLoginSuccess={(user) => console.log("Logged in", user)}
  onRegisterLinkPress={() => navigation.navigate("Register")}
  onNavigateToError={() => navigation.navigate("Error")}
/>`}
              </pre>
            </div>
            <div>
              <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-50">
                RegisterScreen
              </p>
              <pre className="mt-2 whitespace-pre-wrap rounded-xl bg-zinc-50 px-4 py-3 text-xs text-zinc-700 dark:bg-black dark:text-zinc-200">
{`<RegisterScreen
  onRegisterSuccess={(user) => console.log("Registered", user)}
  onLoginLinkPress={() => navigation.navigate("Login")}
  onNavigateToError={() => navigation.navigate("Error")}
/>`}
              </pre>
            </div>
            <div>
              <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-50">
                ChatScreen
              </p>
              <pre className="mt-2 whitespace-pre-wrap rounded-xl bg-zinc-50 px-4 py-3 text-xs text-zinc-700 dark:bg-black dark:text-zinc-200">
{`<ChatScreen
  onLogout={() => navigation.replace("Login")}
  onNavigateToDashboard={() => navigation.navigate("Dashboard")}
/>`}
              </pre>
            </div>
            <div>
              <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-50">
                DashboardScreen
              </p>
              <pre className="mt-2 whitespace-pre-wrap rounded-xl bg-zinc-50 px-4 py-3 text-xs text-zinc-700 dark:bg-black dark:text-zinc-200">
{`<DashboardScreen
  onLogout={() => navigation.replace("Login")}
  onNavigateBack={() => navigation.goBack()}
  onNavigateToHome={() => navigation.navigate("Home")}
  onNavigateToError={() => navigation.navigate("Error")}
/>`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

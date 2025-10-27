import homepage from "@/styles/homepage.module.css";
import SidebarPage from "@/components/Sidebar";

export default function HomePage() {
  return (
    <div className={homepage.maincontainer}>
      <SidebarPage />
      <p>Homepage</p>
    </div>
  );
}

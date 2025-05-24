import { Banner } from "../components/Banner";
import { Header } from "../components/Header";
import { Layout } from "../components/Layout";
import { Speciality } from "../components/Speciality";
import { TopDoctors } from "../components/TopDoctors";

export const Home = () => {
  return (
    <>
      <Layout>
        <Header />
        <Speciality />
        <TopDoctors />
        <Banner />
      </Layout>
    </>
  );
};

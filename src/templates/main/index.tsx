import Link from 'next/link';
import UserProfile from './components/UserProfile';

const MainPage = async () => {
  return (
    <section className="flex pt-[70px]">
      <UserProfile />
      <Link href="/album" className="ml-24">
        앨범 생성
      </Link>
    </section>
  );
};

export default MainPage;

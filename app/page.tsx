import { db } from "@/firebase.config";
import { auth, useUser } from "@clerk/nextjs";
import { DocumentData, collection, getDocs } from "firebase/firestore";
import Sidebar from "./components/Sidebar";
import { timeStamp } from "console";

const HomePage = async () => {
  const { userId } = auth();
  let ArticleArray: DocumentData[] = [];
  const uploadedTime: DocumentData[] = [];
  // , userId!, "Files"

  if (!userId) return;
  const querySnapshot = await getDocs(collection(db, "Articles"));

  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    ArticleArray.push(doc.data());
  });

  return (
    <div className="flex max-w-7xl mx-auto bg-black lg:bg-white">
      {/* sidebar */}
      <div className="w-[20rem] bg-[#101010] fixed h-screen text-white lg:inline-flex hidden">
        <Sidebar />
      </div>
      <div className="lg:pl-[20rem] space-y-8 px-4">
        {ArticleArray.map((article) => (
          <div
            key={article.userId}
            className="lg:w-[40rem] justify-center flex flex-col "
          >
            <div className="flex justify-between p-4 bg-[#420420] text-white rounded-t-lg  ">
              <div className="flex space-x-4 lg:space-x-10 ">
                <img
                  src={article.ProfileImage}
                  alt=""
                  className="h-8 w-8 rounded-full"
                />
                <div>
                  <p className="font-serif">{article.FullName}</p>
                </div>
              </div>

              <p>
                {new Date(article.timeStamps.seconds * 1000).toLocaleString()}
              </p>
            </div>
            <div className="">
              {/* <p className="font-bold text-xl ">{article.Articletitle}</p> */}

              <p className="bg-[#420420] text-white py-2 font-medium text-sm lg:pl-24 px-16">
                {article.ArticleDescription}
              </p>
              <img
                src={article.downloadURL}
                alt=""
                className="w-full rounded-b-lg"
              />
            </div>

            {/* Emoji update */}
            <div className="text-white">Emoji</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;

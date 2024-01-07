"use client";

import { db, storage } from "@/firebase.config";
import { useUser } from "@clerk/nextjs";
import { getDownloadURL, ref } from "firebase/storage";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { uploadBytes } from "firebase/storage";
import { useRouter } from "next/navigation";

import { useState } from "react";

function Article() {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [file, setFile] = useState();

  const { user } = useUser();
  const router = useRouter();
  const handleArticleFormSubmit = async (e: any) => {
    // , `${user?.id}`, "Files"
    e.preventDefault();
    const docRef = await addDoc(collection(db, "Articles"), {
      userId: user?.id,
      FirstName: user?.firstName,
      FullName: user?.fullName,
      ProfileImage: user?.imageUrl,
      Articletitle: title,
      ArticleDescription: description,
      timeStamps: serverTimestamp(),
    });

    console.log(`document id : ${docRef.id}`);

    const fileRef = await ref(storage, `${docRef.id}`);

    uploadBytes(fileRef, file).then(async (snapshot) => {
      const downloadURL = await getDownloadURL(fileRef);

      await updateDoc(doc(db, "Articles", docRef.id), {
        downloadURL: downloadURL,
      });

      console.log("Uploaded a blob or file!");
    });

    alert("Post Added Successfully");
    router.push("/");
  };

  const handTitleInput = (e: any) => {
    setTitle(e.target.value);
  };
  const handleDescriptionInput = (e: any) => {
    setDescription(e.target.value);
  };

  const handleFileInput = (e: any) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="max-w-7xl mx-auto mt-10 p-4">
      <form action="" className="flex flex-col gap-8">
        <input
          type="text"
          name=""
          id=""
          placeholder="Enter Your Title"
          className="border-gray-300 border-[2px] h-10 pl-6  placeholder:text-sm placeholder:text-green-200 bg-[#8A2BE2] text-[#FFA500]"
          onChange={handTitleInput}
        />

        <textarea
          name=""
          id=""
          cols={30}
          rows={10}
          placeholder="Description"
          className="border-gray-300 border-[2px] pl-6 placeholder:text-sm placeholder:text-green-200 bg-[#8A2BE2] text-[#FFA500]"
          onChange={handleDescriptionInput}
        />

        {/* Image Picker */}

        <input type="file" name="" id="" onChange={handleFileInput} />

        <button
          onClick={handleArticleFormSubmit}
          className="p-2 bg-black text-white w-full shadow-xl rounded-sm font-medium
          hover:text-green-400 
          "
        >
          Post Article
        </button>
      </form>
    </div>
  );
}

export default Article;

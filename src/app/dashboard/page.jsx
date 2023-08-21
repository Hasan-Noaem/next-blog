"use client";
import React, { useEffect, useState } from "react";
import style from "./page.module.css";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Dashboard = () => {
     // const [data,setData] = useState([]);
     // const [error,setError] = useState(false);
     // const [isLoading,setIsLoading] = useState(false);

     // useEffect(() => {
     //      const getData = async () => {
     //           setIsLoading(true);
     //           const res = await fetch("https://jsonplaceholder.typicode.com/posts" , {
     //                cache: 'force-cache' 
     //           });

     //           if (!res.ok) {
     //                setError(true);
     //           }

     //           const data = await res.json();
     //           setData(data);
     //           setIsLoading(false);
     //      }       
     //      getData();
     // }, []);

     const session = useSession();
     const router = useRouter();

     const fetcher = (...args) => fetch(...args).then(res => res.json());
     const { data, mutate, error, isLoading } = useSWR(
          `/api/posts?username=${session?.data?.user.name}`, fetcher);
          console.log(data);

     if(session.status === "loading") {
          return <p>Loading...</p>
     }
     if(session.status === "unauthenticated") {
          router?.push("/dashboard/login");
     }

     const handleSubmit = async(e) => {
          e.preventDefault();
          const title = e.target[0].value;
          const desc = e.target[1].value;
          const img = e.target[2].value;
          const content = e.target[3].value;

          try {
               await fetch("/api/posts", {
                    method: "POST",
                    body: JSON.stringify({
                         title,desc,img,content,
                         username: session.data.user.name,
                    }),
               }) 
               mutate();
               e.target.reset();
          } catch (error) {
               console.log(error);
          }
     }

     const handleDelete = async(id) => {
          try {
               await fetch(`/api/posts/${id}`, {
                    method: "DELETE",
               });
               mutate();
          } catch (error) {
               console.log(error);
          }
     }

     if(session.status === "authenticated") {
          return (
               <div className={style.container}>
               <div className={style.posts}>
               {isLoading ? "loading" : data?.map((post) => (
                    <div className={style.post} key={post._id}>
                    <div className={style.imgContainer}>
                         <Image className={style.img} src={post.img} width={200} height={100} alt=""/>
                    </div>
                         <h2 className={style.postTitle}>{post.title}</h2>  
                         <span className={style.delete} onClick={() => handleDelete(post._id)}>X</span>
                    </div>
               ))}
               </div>
                    <form className={style.new} onSubmit={handleSubmit}>
                         <h1>Add New Post</h1>
                         <input type="text" placeholder="Title" className={style.input}/>
                         <input type="text" placeholder="Desc" className={style.input}/>
                         <input type="text" placeholder="Image" className={style.input}/>
                         <textarea
                              placeholder="Content"
                              className={style.textArea}
                              cols="30"
                              rows="10"
                         >     
                         </textarea>
                         <button className={style.button}>Send</button>
                    </form>
               </div>     
          );
     }
}

export default Dashboard;
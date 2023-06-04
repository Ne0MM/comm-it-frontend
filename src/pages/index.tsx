import styles from '@/styles/Home.module.css'
import { useEffect, useState } from 'react'
import Image from 'next/image';

export default function Home() {

  const[postItArray, setPostItArray] = useState([]);
  const[editText, setEditText] = useState("");
  const[editAuthor, setEditAuthor] = useState("");
  const[editColor, setEditColor] = useState(0);
  const[editing, setEditing] = useState(false);

  const colors = [
    "#ffc000",
    "#3FE80C",
    "#0AE0FF",
    "#E82B0C",
    "#8E0DFF"
  ]

  const fetchPostIts = async () => {

    let newPostItArray = await fetch("https://comm-it-api-production.up.railway.app/", {})

    setPostItArray(await newPostItArray.json());

  }

  const handleEditText = (event : any) => {

    setEditText(event.target.value);

  }

  const handleAuthorEdit = (event : any) => {

    setEditAuthor(event.target.value)

  }

  const handleColorEdit = () => {

    if(editColor < 4){setEditColor(editColor + 1);}
    else{setEditColor(0);}

  }

  const handlePostItEditButton = () => {

    setEditAuthor("");
    setEditColor(0);
    setEditText("");
    setEditing(!editing);

  }

  const newPost = async () => {

    await fetch("https://comm-it-api-production.up.railway.app/new_post",{
      method: "POST",
      body : JSON.stringify({
        "author" : editAuthor,
        "color" : colors[editColor],
        "text" : editText
      }),
      headers : {
        "content-type" : "application/json"
      }
    });

    fetchPostIts();
    handlePostItEditButton();

  }

  const renderPost = () => {

    if(editing){

      return(
        <div
        className={styles.postItContainer}
        style={{['--post-color' as any]: colors[editColor]}}
        >
          <div className={styles.postTopEdit}>

            <Image
            src="/assets/theme.png"
            width={16}
            height={16}
            className={styles.editColor}
            onClick={handleColorEdit}
            alt="theme icon"
            />

            <Image
            src="/assets/close.png"
            width={16}
            height={16}
            className={styles.editClose}
            onClick={handlePostItEditButton}
            alt="close icon"
            />

          </div>

          <input
          className={styles.postTextEdit}
          contentEditable="true"
          value={editText}
          onChange={handleEditText}
          />

          <div className={styles.postBottom}>

            <input 
            className={styles.postAuthorEdit}
            placeholder='"autor"'
            value={editAuthor}
            onChange={handleAuthorEdit}
            />

            <div className={styles.postLikes}>
              <button 
              className={styles.postButton}
              onClick={newPost}
              >
                Post
              </button>
            </div>

          </div>

        </div>
      )
    }else{

      return(
        <div className={styles.postItEditContainer}>
          <button
          className={styles.postItEditButton}
          onClick={handlePostItEditButton}
          >+</button>
        </div>
      )

    }

  }

  useEffect(() => {

    fetchPostIts();

  },[])

  return (
    <div className={styles.generalContainer}>
        <header className={styles.header}>
            <span className={styles.headerLogo}>commit app</span>
        </header>
          {renderPost()}
        <main className={styles.mainContainer}>

          {postItArray.map((e, index) => {

            return(
              <div
              key={index}
              className={styles.postItContainer}
              style={{['--post-color' as any] : postItArray[index].color}}
              >

                <span className={styles.postText}>
                  {postItArray[index].text}
                </span>

                <div className={styles.postBottom}>

                  <span className={styles.postAuthor}>
                    {postItArray[index].author}
                  </span>

                  <div className={styles.postLikes}>
                    <div className={styles.likeHearth}>
                      
                    </div>
                    <div className={styles.likeNumber}>
                      
                    </div>
                  </div>

                </div>

              </div>
            )

          })}

        </main>
    </div>
  )
}

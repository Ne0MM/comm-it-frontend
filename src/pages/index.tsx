import styles from '@/styles/Home.module.css'
import { useEffect, useState } from 'react'

export default function Home() {

  const[postItArray, setPostItArray] = useState([]);
  const[editText, setEditText] = useState("");
  const[editAuthor, setEditAuthor] = useState("");

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

  const renderPost = () => {

    return(
      <div
      className={styles.postItContainer}
      style={{['--post-color'] : "#ffc000"}}
      >

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
            >
              Post
            </button>
          </div>

        </div>

      </div>
    )

  }

  useEffect(() => {

    fetchPostIts();

  },[])

  return (
    <div className={styles.generalContainer}>
        <header className={styles.header}>
            <span className={styles.headerLogo}>commit app</span>
        </header>
        <main className={styles.mainContainer}>

          {postItArray.map((e, index) => {

            return(
              <div
              key={index}
              className={styles.postItContainer}
              style={{['--post-color'] : postItArray[index].color}}
              >

                <span className={styles.postText}>
                  {postItArray[index].text}
                </span>

                <div className={styles.postBottom}>

                  <span className={styles.postAuthor}>
                    "author"
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

          {renderPost()}

        </main>
    </div>
  )
}

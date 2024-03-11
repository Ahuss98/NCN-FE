import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

function SingleArticle(){
    let {article_id} = useParams()
    const [article,setArticle] = useState({})

    useEffect(() => {
        axios.get(`https://ncn-network.onrender.com/api/articles/${article_id}`)
        .then((response) => {
            console.log(response.data)
            setArticle(response.data)
        })
    },[])
console.log(article,'outside the effect')

return(
    <div className="singleArticle">
        <img src={article.article_img_url} alt="" />
        <h3>{article.article}</h3>
    </div>
)
}
export default SingleArticle
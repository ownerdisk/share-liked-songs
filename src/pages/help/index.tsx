import Markdown from 'react-markdown'
import { content } from './content'

import './help.css'

const HelpPage = () => {
    
    return(
        <article className='p-2 min-h-full w-full'>
            <Markdown>{content}</Markdown>
        </article>
    )
}

export default HelpPage
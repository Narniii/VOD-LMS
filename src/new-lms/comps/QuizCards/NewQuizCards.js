import { Box, Typography } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom';
import { BG_URL, PUBLIC_URL } from '../../../utils/utils';
import '../../style/NewQuiz.css'

export default function NewQuizCards({ link, bgImage, title, description, isFactor }) {
    return (
        <Link to={link} className="quiz-cards" style={{
            margin: '30px auto',
            width: '90%',
            height: '300px',
            display: 'flex',
            flexDirection: 'column',
            clipPath: 'polygon(20px 0, 100% 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 100%, 0 20px)',
            background: '#2f3835',
            overflow: 'hidden'
        }}>
            <Box className="quiz-cards-images" sx={{
                backgroundImage: BG_URL(PUBLIC_URL(bgImage)),
                backgroundSize: isFactor ? 'contain' : 'cover',
                backgroundRepeat: "no-repeat",
                backgroundPosition: 'center',
                height: '150px',
                width: '100%'
            }} />
            <Box sx={{
                flex: 1,
                display: 'flex',
                padding: '10px 20px',
                flexDirection: 'column'
            }}>
                <Typography style={{ fontSize: '18px', color: '#64c5ba', fontWeight: 'bold' }}>{title}</Typography>
                <Typography style={{ fontSize: '14px' }}>{description.length > 200 ? description.substring(0, 100) + "..." : description}</Typography>
            </Box >
        </Link>
    )
}

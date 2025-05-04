import { Box, Typography } from '@mui/material'

interface Props {
    title: string
}

export function Header({ title }: Props) {
    return (
        <>
            <Box sx={{py: 2}}>
                <Typography variant="h4" gutterBottom>
                    {title}
                </Typography>
                <hr />
            </Box>
        </>
    )
}
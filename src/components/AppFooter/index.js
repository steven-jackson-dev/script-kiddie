import React from 'react'
import { Typography } from '@material-ui/core'
import Link from '@material-ui/core/Link';

const AppFooter = () => {
    return (
        <footer style={{ textAlign: 'center' }}>
            <Typography variant="body2" color="textSecondary" align="center">
                <Link color="inherit" href="https://github.com/steven-jackson-dev">
                    Steven Jackson   {new Date().getFullYear()}
                </Link>
            </Typography>
        </footer>
    )
}

export default AppFooter

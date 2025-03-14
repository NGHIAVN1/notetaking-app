module.exports =
{
       ClearCookie(req, res) {
        res.clearCookie('jwt').send('cookie cleared');
    }
}
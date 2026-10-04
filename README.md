# Portfolio

My product design portfolio. Built with Next.js, statically exported and deployed to reg.ru through GitHub Actions.

## Development and publishing

Run `npm run dev` locally, `npm run lint` to check code, and `npm run build` to export the site to `out/`.
Both development startup and production builds generate the project catalog from every JSON file in `content/data/projects/`.
Existing case order is preserved; newly created CMS cases are appended automatically.
Restart the development server after adding a case through the CMS.

Pushes to `main` deploy through `.github/workflows/deploy.yml`. FTP credentials belong only in repository secrets.
FTPS requires a valid trusted certificate matching `FTP_HOST`; use the provider's certified server hostname, not an IP address.
The control channel is encrypted; the data channel remains unencrypted for reg.ru compatibility and contains public website files only.
Deployments are queued rather than interrupted midway through an upload.

**Live:** https://petrafanasyev.com/

## About me

Petr Afanasyev — product designer, 5+ years. Currently at VTB Bank (27M+ users) working on the notifications cluster (push, SMS, in-app). Based
in Moscow, originally from Yakutia.

## Contact

- Telegram: [@PetrAfanasyev](https://t.me/PetrAfanasyev)
- Email: apm.x17@gmail.com
- LinkedIn: https://www.linkedin.com/in/petrafanasyev/

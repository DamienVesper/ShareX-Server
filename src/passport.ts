import passport from 'passport';

import { Strategy as DiscordStrategy } from 'passport-discord';
import { VerifyCallback } from 'passport-oauth2';
import refresh from 'passport-oauth2-refresh';

const discordStrategy = new DiscordStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: `https://i.alru.ga/auth/callback`,
    scope: [`identify`, `email`, `guilds`, `guilds.join`]
    // eslint-disable-next-line
}, (accessToken: string, refreshToken: string, profile: DiscordStrategy.Profile, done: VerifyCallback) => {
    // eslint-disable-next-line
    (<any>profile).refreshToken = refreshToken;
});

passport.use(discordStrategy);
refresh.use(discordStrategy);

export default passport;

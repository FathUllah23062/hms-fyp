import { NavigationBar } from "./navbar/NavigationBar";
import { Home } from "./home/Home";
import { UserSideBar } from "./userSideBar/UserSideBar";
import { Facilities } from "./facilities/Facilities";
import { Contact } from "./contact/Contact";
import { Location } from "./location/Location";
import { Team } from "./team/Team";
import { LowerFooter } from "./footer/LowerFooter";


export function UseerSide() {
    return (
        <>
            <NavigationBar />
            <UserSideBar />
            <Home />
            <Facilities />
            <Contact />
            <Location />
            <Team />
            <LowerFooter />

        </>
    );
}
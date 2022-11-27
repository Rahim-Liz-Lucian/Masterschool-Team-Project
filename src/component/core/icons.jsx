import { Link } from "wouter-preact";
import avatarFallback from "../../assets/brand/avatar-fallback.jpg";
import { logo, logoSmall, google, facebook, star, profile } from "./icons.module.css";

export const Avatar = ({ user, src = avatarFallback, ...props }) => {
    if (!user) return (
        <img src={src} {...props} />
    );

    return (
        <img src={user.photoURL ?? `https://source.boringavatars.com/beam/${user.displayName}-${user.uid}`}  {...props} />
    );
};

export const LinkAvatar = ({ user, className, ...props }) => {
    return (
        <Link {...props}>
            {user ? (
                <img className={className} src={user.photoURL ?? `https://source.boringavatars.com/beam/${user.displayName}-${user.uid}`} alt="" />
            ) : (
                <img className={className} src={avatarFallback} alt="" />
            )}
        </Link>
    );
};

export const More = (props) => {
    return (
        <svg {...props} viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.5 0C19.7981 0 22.0738 0.452651 24.197 1.33211C26.3202 2.21157 28.2493 3.50061 29.8744 5.12563C31.4994 6.75066 32.7884 8.67984 33.6679 10.803C34.5474 12.9262 35 15.2019 35 17.5C35 22.1413 33.1563 26.5925 29.8744 29.8744C26.5925 33.1563 22.1413 35 17.5 35C15.2019 35 12.9262 34.5474 10.803 33.6679C8.67984 32.7884 6.75066 31.4994 5.12563 29.8744C1.84374 26.5925 0 22.1413 0 17.5C0 12.8587 1.84374 8.40752 5.12563 5.12563C8.40752 1.84374 12.8587 0 17.5 0ZM17.5 14.875C16.8038 14.875 16.1361 15.1516 15.6438 15.6438C15.1516 16.1361 14.875 16.8038 14.875 17.5C14.875 18.1962 15.1516 18.8639 15.6438 19.3562C16.1361 19.8484 16.8038 20.125 17.5 20.125C18.1962 20.125 18.8639 19.8484 19.3562 19.3562C19.8484 18.8639 20.125 18.1962 20.125 17.5C20.125 16.8038 19.8484 16.1361 19.3562 15.6438C18.8639 15.1516 18.1962 14.875 17.5 14.875ZM7.875 14.875C7.17881 14.875 6.51113 15.1516 6.01884 15.6438C5.52656 16.1361 5.25 16.8038 5.25 17.5C5.25 18.1962 5.52656 18.8639 6.01884 19.3562C6.51113 19.8484 7.17881 20.125 7.875 20.125C8.57119 20.125 9.23887 19.8484 9.73116 19.3562C10.2234 18.8639 10.5 18.1962 10.5 17.5C10.5 16.8038 10.2234 16.1361 9.73116 15.6438C9.23887 15.1516 8.57119 14.875 7.875 14.875ZM27.125 14.875C26.4288 14.875 25.7611 15.1516 25.2688 15.6438C24.7766 16.1361 24.5 16.8038 24.5 17.5C24.5 18.1962 24.7766 18.8639 25.2688 19.3562C25.7611 19.8484 26.4288 20.125 27.125 20.125C27.8212 20.125 28.4889 19.8484 28.9812 19.3562C29.4734 18.8639 29.75 18.1962 29.75 17.5C29.75 16.8038 29.4734 16.1361 28.9812 15.6438C28.4889 15.1516 27.8212 14.875 27.125 14.875Z" fill="#D9D9D9" />
        </svg>
    );
};

export const Home = (props) => {
    return (
        <svg {...props} viewBox="0 0 32 35" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 35C2.9 35 1.95867 34.6087 1.176 33.826C0.392 33.042 0 32.1 0 31V13C0 12.3667 0.142 11.7667 0.426 11.2C0.708666 10.6333 1.1 10.1667 1.6 9.8L13.6 0.8C13.9667 0.533334 14.35 0.333333 14.75 0.2C15.15 0.0666665 15.5667 0 16 0C16.4333 0 16.85 0.0666665 17.25 0.2C17.65 0.333333 18.0333 0.533334 18.4 0.8L30.4 9.8C30.9 10.1667 31.292 10.6333 31.576 11.2C31.8587 11.7667 32 12.3667 32 13V31C32 32.1 31.6087 33.042 30.826 33.826C30.042 34.6087 29.1 35 28 35H20V21H12V35H4Z" />
        </svg>

    );
};

export const Message = (props) => {
    return (
        <svg {...props} viewBox="0 0 36 35" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M32 0H4C3.07174 0 2.1815 0.368749 1.52513 1.02513C0.868749 1.6815 0.5 2.57174 0.5 3.5V35L7.5 28H32C32.9283 28 33.8185 27.6313 34.4749 26.9749C35.1312 26.3185 35.5 25.4283 35.5 24.5V3.5C35.5 2.57174 35.1312 1.6815 34.4749 1.02513C33.8185 0.368749 32.9283 0 32 0Z" />
        </svg>
    );
};

export const Add = props => {
    return (
        <svg {...props} viewBox="0 0 36 35" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 0C8.33594 0 0.5 7.83594 0.5 17.5C0.5 27.1641 8.33594 35 18 35C27.6641 35 35.5 27.1641 35.5 17.5C35.5 7.83594 27.6641 0 18 0ZM25.5 18.4375C25.5 18.6094 25.3594 18.75 25.1875 18.75H19.25V24.6875C19.25 24.8594 19.1094 25 18.9375 25H17.0625C16.8906 25 16.75 24.8594 16.75 24.6875V18.75H10.8125C10.6406 18.75 10.5 18.6094 10.5 18.4375V16.5625C10.5 16.3906 10.6406 16.25 10.8125 16.25H16.75V10.3125C16.75 10.1406 16.8906 10 17.0625 10H18.9375C19.1094 10 19.25 10.1406 19.25 10.3125V16.25H25.1875C25.3594 16.25 25.5 16.3906 25.5 16.5625V18.4375Z" />
        </svg>
    );
};

export const Profile = props => {
    return (
        <svg className={profile} {...props} viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M30.9584 28.6623C32.7548 26.5026 34.0042 23.9425 34.601 21.1983C35.1977 18.4541 35.1242 15.6067 34.3867 12.897C33.6491 10.1872 32.2692 7.69479 30.3638 5.63057C28.4583 3.56635 26.0832 1.99105 23.4396 1.03794C20.7959 0.0848302 17.9614 -0.218057 15.1758 0.154904C12.3902 0.527864 9.73548 1.5657 7.43621 3.18061C5.13694 4.79553 3.26076 6.94001 1.9664 9.43266C0.672027 11.9253 -0.00245499 14.6928 6.71435e-06 17.501C0.000951356 21.5833 1.44072 25.5348 4.06666 28.6623L4.04164 28.6835C4.12921 28.7885 4.22928 28.8785 4.31934 28.9822C4.43192 29.111 4.55326 29.2322 4.66959 29.3572C5.01984 29.7372 5.3801 30.1021 5.75787 30.4446C5.87295 30.5496 5.99179 30.6471 6.10812 30.7471C6.50841 31.092 6.91995 31.4195 7.3465 31.7244C7.40154 31.7619 7.45158 31.8107 7.50662 31.8494V31.8344C10.4363 33.8944 13.9313 35 17.5138 35C21.0962 35 24.5912 33.8944 27.5209 31.8344V31.8494C27.576 31.8107 27.6247 31.7619 27.681 31.7244C28.1063 31.4182 28.5191 31.092 28.9194 30.7471C29.0357 30.6471 29.1546 30.5483 29.2697 30.4446C29.6474 30.1009 30.0077 29.7372 30.3579 29.3572C30.4743 29.2322 30.5944 29.111 30.7082 28.9822C30.797 28.8785 30.8983 28.7885 30.9859 28.6823L30.9584 28.6623ZM17.5125 7.50202C18.6258 7.50202 19.7141 7.83189 20.6398 8.44991C21.5655 9.06792 22.287 9.94633 22.7131 10.9741C23.1391 12.0018 23.2506 13.1327 23.0334 14.2237C22.8162 15.3147 22.2801 16.3169 21.4928 17.1035C20.7056 17.8901 19.7026 18.4257 18.6107 18.6428C17.5188 18.8598 16.387 18.7484 15.3584 18.3227C14.3298 17.897 13.4507 17.1761 12.8322 16.2512C12.2136 15.3262 11.8835 14.2388 11.8835 13.1264C11.8835 11.6347 12.4766 10.2042 13.5322 9.14937C14.5878 8.09459 16.0196 7.50202 17.5125 7.50202ZM7.51412 28.6623C7.53582 27.0212 8.2033 25.4546 9.37215 24.3014C10.541 23.1483 12.1172 22.5013 13.7598 22.5004H21.2652C22.9078 22.5013 24.484 23.1483 25.6529 24.3014C26.8217 25.4546 27.4892 27.0212 27.5109 28.6623C24.7675 31.1324 21.2055 32.4995 17.5125 32.4995C13.8196 32.4995 10.2575 31.1324 7.51412 28.6623Z" />
        </svg>
    );
};

export const Back = props => {
    return (
        <svg {...props} viewBox="0 0 35 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M35 18C35 14.5388 33.9736 11.1554 32.0507 8.27753C30.1278 5.39967 27.3947 3.15665 24.197 1.83212C20.9993 0.507582 17.4806 0.161024 14.0859 0.836265C10.6913 1.51151 7.57306 3.17822 5.12564 5.62564C2.67822 8.07306 1.01151 11.1913 0.336265 14.5859C-0.338976 17.9806 0.00758247 21.4993 1.33212 24.697C2.65665 27.8947 4.89967 30.6278 7.77753 32.5507C10.6554 34.4736 14.0388 35.5 17.5 35.5C22.1413 35.5 26.5925 33.6563 29.8744 30.3744C33.1563 27.0925 35 22.6413 35 18V18ZM14.245 24.4575L9.24001 19.2075C9.16594 19.1316 9.1066 19.0426 9.06501 18.945C8.99069 18.8627 8.93145 18.7679 8.89001 18.665C8.79742 18.4555 8.7496 18.229 8.7496 18C8.7496 17.771 8.79742 17.5445 8.89001 17.335C8.9733 17.1202 9.09818 16.9239 9.25751 16.7575L14.5075 11.5075C14.837 11.178 15.284 10.9928 15.75 10.9928C16.216 10.9928 16.663 11.178 16.9925 11.5075C17.322 11.837 17.5072 12.284 17.5072 12.75C17.5072 13.216 17.322 13.663 16.9925 13.9925L14.7175 16.25H24.5C24.9641 16.25 25.4093 16.4344 25.7374 16.7626C26.0656 17.0908 26.25 17.5359 26.25 18C26.25 18.4641 26.0656 18.9093 25.7374 19.2374C25.4093 19.5656 24.9641 19.75 24.5 19.75H14.595L16.7825 22.0425C17.1028 22.379 17.2762 22.8289 17.2647 23.2933C17.2532 23.7577 17.0577 24.1985 16.7213 24.5188C16.3848 24.839 15.9348 25.0125 15.4704 25.001C15.0061 24.9895 14.5653 24.794 14.245 24.4575V24.4575Z" />
        </svg>

    );
};

export const Location = props => {
    return (
        <svg {...props} viewBox="0 0 8 11" fill="none" xmlns="http://www.w3.org/2000/svg" >
            <path d="M8 4.25973C8 5.97119 5.5625 9.01814 4.49375 10.2753C4.2375 10.5749 3.7625 10.5749 3.50625 10.2753C2.4375 9.01814 0 5.97119 0 4.25973C0 2.18405 1.79167 0.5 4 0.5C6.20833 0.5 8 2.18405 8 4.25973Z" />
        </svg >
    );
};

export const Telephone = props => {
    return (
        <svg {...props} viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.62 8.29C5.06 11.12 7.38 13.43 10.21 14.88L12.41 12.68C12.68 12.41 13.08 12.32 13.43 12.44C14.55 12.81 15.76 13.01 17 13.01C17.55 13.01 18 13.46 18 14.01V17.5C18 18.05 17.55 18.5 17 18.5C7.61 18.5 0 10.89 0 1.5C0 0.95 0.45 0.5 1 0.5H4.5C5.05 0.5 5.5 0.95 5.5 1.5C5.5 2.75 5.7 3.95 6.07 5.07C6.18 5.42 6.1 5.81 5.82 6.09L3.62 8.29Z" />
        </svg>
    );
};

export const Share = props => {
    return (
        <svg {...props} viewBox="0 0 21 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5 11.5H8.5C6.8596 11.4994 5.25023 11.9471 3.84588 12.7949C2.44152 13.6427 1.2956 14.8582 0.532001 16.31C0.510538 16.0405 0.499863 15.7703 0.500001 15.5C0.500001 9.977 4.977 5.5 10.5 5.5V0.5L20.5 8.5L10.5 16.5V11.5Z" />
        </svg>
    );
};

export const Star = props => {
    return (
        <svg className={star} {...props} viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.80606 7.72151C1.61306 7.82051 1.39406 7.64701 1.43306 7.42551L1.84806 5.06051L0.0865591 3.38251C-0.0779409 3.22551 0.00755914 2.93851 0.228059 2.90751L2.67706 2.55951L3.76906 0.396006C3.86756 0.201006 4.13406 0.201006 4.23256 0.396006L5.32456 2.55951L7.77356 2.90751C7.99406 2.93851 8.07956 3.22551 7.91456 3.38251L6.15356 5.06051L6.56856 7.42551C6.60756 7.64701 6.38856 7.82051 6.19556 7.72151L4.00006 6.59351L1.80556 7.72151H1.80606Z" />
        </svg>
    );
};

export const Facebook = props => {
    return (
        <svg className={facebook} {...props} viewBox="0 0 33 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M0 16.8475C0 25.0507 5.95788 31.8721 13.75 33.2554V21.3382H9.625V16.7554H13.75V13.0882C13.75 8.96325 16.4079 6.6725 20.1671 6.6725C21.3579 6.6725 22.6421 6.85537 23.8329 7.03825V11.2554H21.725C19.7079 11.2554 19.25 12.2632 19.25 13.5475V16.7554H23.65L22.9171 21.3382H19.25V33.2554C27.0421 31.8721 33 25.0521 33 16.8475C33 7.72162 25.575 0.255371 16.5 0.255371C7.425 0.255371 0 7.72162 0 16.8475Z" />
        </svg>

    );
};

export const Google = props => {
    return (
        <svg className={google} {...props} viewBox="0 0 33 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M16.5 0.255371C7.3865 0.255371 0 7.64325 0 16.7554C0 25.8675 7.3865 33.2554 16.5 33.2554C25.6121 33.2554 33 25.8675 33 16.7554C33 7.64325 25.6121 0.255371 16.5 0.255371ZM16.6925 26.4051C11.374 26.4051 7.0675 22.0876 7.0675 16.7554C7.0675 11.4231 11.374 7.10562 16.6925 7.10562C19.2913 7.10562 21.4638 8.064 23.1303 9.6205L20.416 12.3402V12.3347C19.4054 11.3695 18.1239 10.8745 16.6925 10.8745C13.5163 10.8745 10.9354 13.564 10.9354 16.7499C10.9354 19.933 13.5163 22.6307 16.6925 22.6307C19.5745 22.6307 21.5352 20.978 21.9395 18.7092H16.6925V14.9459H25.7469C25.8679 15.5921 25.9325 16.2659 25.9325 16.9726C25.9325 22.4864 22.2516 26.4051 16.6925 26.4051Z" />
        </svg>

    );
};

export const WasteLessLite = props => {
    return (
        <svg className={logoSmall} {...props} viewBox="0 0 40 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.26442 4.63445C8.11955 4.86229 6.67144 5.49133 5.68128 6.68423C4.75699 7.79778 4.01365 9.66133 4.68154 12.8724C5.32288 15.9558 7.94659 19.5067 11.3559 22.9569C14.1607 25.7953 17.267 28.3433 19.6593 30.2533C21.9111 28.4554 24.7971 26.0911 27.4707 23.4488L30.3582 26.3704C27.0837 29.6066 23.5325 32.4252 21.192 34.2829C21.1051 34.3519 21.0199 34.4195 20.9365 34.4857L19.6593 35.5L18.382 34.4857C18.2978 34.4189 18.2119 34.3507 18.1242 34.2811C15.6594 32.3247 11.8509 29.302 8.43404 25.8441C4.96813 22.3367 1.56331 18.0523 0.659895 13.7089C-0.222504 9.46648 0.679669 6.27848 2.52054 4.06068C4.28982 1.92912 6.71549 0.947363 8.49587 0.599191L8.53032 0.592758C10.3419 0.270479 12.9336 0.814225 15.2157 1.81714C16.7364 2.48549 18.3418 3.45368 19.6593 4.75316C20.9767 3.45368 22.5821 2.4855 24.1028 1.81714C26.3849 0.814225 28.9766 0.270479 30.7882 0.592758L30.8226 0.599191C32.603 0.947363 35.0287 1.92913 36.798 4.06068C38.6388 6.27848 39.541 9.46648 38.6586 13.7089C38.2789 15.5346 37.467 17.3163 36.4409 18.9946L32.9363 16.8518C33.8043 15.4322 34.3825 14.0959 34.637 12.8724C35.3049 9.66133 34.5615 7.79778 33.6372 6.68423C32.6471 5.49133 31.199 4.86229 30.0541 4.63445C29.3794 4.52177 27.6824 4.73088 25.7556 5.5777C23.8634 6.4093 22.2463 7.64287 21.4629 9.08115L19.6593 12.3923L17.8556 9.08115C17.0722 7.64287 15.4552 6.4093 13.563 5.5777C11.6361 4.73088 9.93916 4.52177 9.26442 4.63445Z" />
            <path d="M40 20L30.4256 14.0074L30.9873 22.8693L40 20Z" />
        </svg>

    );
};

/**
 * TODO add fill as option for dynamic colours 
 */
export const WasteLess = ({ className, ...props }) => {
    return (
        <svg {...props} className={logo} viewBox="0 0 219 231" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.48537 51.1475C8.09401 51.1475 7.84497 50.9699 7.73823 50.6148L0.0533671 24.4549L0 24.2418C0 23.8866 0.195679 23.709 0.587038 23.709H7.04446C7.43582 23.709 7.68487 23.8866 7.7916 24.2418L11.634 40.332C11.6696 40.4385 11.723 40.4918 11.7941 40.4918C11.8653 40.4918 11.9187 40.4385 11.9542 40.332L15.9568 24.2418C16.0635 23.8866 16.3126 23.709 16.7039 23.709H22.3075C22.6988 23.709 22.9479 23.8866 23.0546 24.2418L27.2706 40.3852C27.3062 40.4918 27.3595 40.5451 27.4307 40.5451C27.5019 40.5451 27.5552 40.4918 27.5908 40.3852L31.7534 24.2418C31.8602 23.8866 32.1092 23.709 32.5006 23.709L38.9046 23.8156C39.1181 23.8156 39.2604 23.8866 39.3316 24.0287C39.4383 24.1352 39.4739 24.2951 39.4383 24.5082L31.6467 50.6148C31.54 50.9699 31.3087 51.1475 30.9529 51.1475H24.4955C24.1042 51.1475 23.8551 50.9699 23.7484 50.6148L19.6391 36.3361C19.6035 36.2295 19.5502 36.1762 19.479 36.1762C19.4078 36.1762 19.3545 36.2295 19.3189 36.3361L15.6899 50.6148C15.5832 50.9699 15.3342 51.1475 14.9428 51.1475H8.48537Z" fill="url(#paint0_linear_414_137)" />
            <path d="M51.8653 23.3361C54.1779 23.3361 56.2414 23.7445 58.0559 24.5615C59.8704 25.3429 61.2757 26.4262 62.2719 27.8115C63.3037 29.1967 63.8196 30.7418 63.8196 32.4467V50.5082C63.8196 50.6858 63.7484 50.8456 63.6061 50.9877C63.4994 51.0943 63.3571 51.1475 63.1792 51.1475H56.9352C56.7573 51.1475 56.5972 51.0943 56.4549 50.9877C56.3482 50.8456 56.2948 50.6858 56.2948 50.5082V48.75C56.2948 48.6434 56.2592 48.5724 56.1881 48.5369C56.1169 48.5014 56.0458 48.5369 55.9746 48.6434C54.4803 50.597 52.0788 51.5738 48.77 51.5738C45.995 51.5738 43.7535 50.8989 42.0458 49.5492C40.338 48.1995 39.4842 46.2104 39.4842 43.582C39.4842 40.847 40.4448 38.7336 42.366 37.2418C44.2872 35.7145 47.0267 34.9508 50.5845 34.9508H56.028C56.2059 34.9508 56.2948 34.862 56.2948 34.6844V33.5123C56.2948 32.3402 55.939 31.4344 55.2275 30.7951C54.5159 30.1202 53.4486 29.7828 52.0254 29.7828C50.9225 29.7828 49.9975 29.9781 49.2504 30.3689C48.5388 30.7596 48.0763 31.3101 47.8628 32.0205C47.7561 32.4112 47.5248 32.5888 47.169 32.5533L40.7116 31.7008C40.2847 31.6298 40.089 31.4699 40.1246 31.2213C40.2669 29.7295 40.8539 28.3798 41.8857 27.1721C42.953 25.9645 44.3406 25.0232 46.0483 24.3484C47.7917 23.6735 49.7307 23.3361 51.8653 23.3361ZM50.798 45.9795C52.3279 45.9795 53.6265 45.571 54.6938 44.7541C55.7611 43.9372 56.2948 42.8893 56.2948 41.6107V39.6926C56.2948 39.515 56.2059 39.4262 56.028 39.4262H52.1855C50.5845 39.4262 49.3215 39.7281 48.3965 40.332C47.507 40.9358 47.0623 41.7883 47.0623 42.8893C47.0623 43.8484 47.4003 44.612 48.0763 45.1803C48.7523 45.7131 49.6595 45.9795 50.798 45.9795Z" fill="url(#paint1_linear_414_137)" />
            <path d="M78.9929 51.5205C76.6092 51.5205 74.5279 51.1831 72.749 50.5082C70.9701 49.8333 69.5825 48.8921 68.5863 47.6844C67.6257 46.4768 67.1454 45.1093 67.1454 43.582V43.0492C67.1454 42.8716 67.1988 42.7295 67.3055 42.623C67.4478 42.4809 67.6079 42.4098 67.7858 42.4098H73.7096C73.8875 42.4098 74.0298 42.4809 74.1365 42.623C74.2788 42.7295 74.35 42.8716 74.35 43.0492V43.1025C74.35 43.8839 74.7769 44.5587 75.6308 45.1271C76.5203 45.6598 77.6232 45.9262 78.9396 45.9262C80.1492 45.9262 81.1276 45.6954 81.8748 45.2336C82.6219 44.7363 82.9955 44.1325 82.9955 43.4221C82.9955 42.7828 82.6753 42.3033 82.0349 41.9836C81.3945 41.6639 80.3449 41.3265 78.8862 40.9713C77.214 40.5451 75.8976 40.1366 74.937 39.7459C72.66 38.9645 70.8456 38.0055 69.4936 36.8689C68.1416 35.7322 67.4656 34.0984 67.4656 31.9672C67.4656 29.3388 68.4796 27.2609 70.5076 25.7336C72.5711 24.1708 75.2928 23.3893 78.6727 23.3893C80.9497 23.3893 82.9421 23.7623 84.6498 24.5082C86.3576 25.2186 87.674 26.2309 88.599 27.5451C89.5596 28.8593 90.0399 30.3511 90.0399 32.0205C90.0399 32.1981 89.9688 32.3579 89.8265 32.5C89.7197 32.6066 89.5774 32.6598 89.3995 32.6598H83.6892C83.5114 32.6598 83.3513 32.6066 83.2089 32.5C83.1022 32.3579 83.0488 32.1981 83.0488 32.0205C83.0488 31.2391 82.6397 30.582 81.8214 30.0492C81.0387 29.5164 79.9891 29.25 78.6727 29.25C77.4987 29.25 76.538 29.4631 75.7909 29.8893C75.0438 30.3156 74.6702 30.9016 74.6702 31.6475C74.6702 32.3579 75.026 32.8907 75.7375 33.2459C76.4847 33.6011 77.7121 33.974 79.4199 34.3648C79.8112 34.4713 80.256 34.5956 80.7541 34.7377C81.2521 34.8443 81.7858 34.9863 82.3551 35.1639C84.8811 35.9098 86.8735 36.8689 88.3322 38.041C89.7909 39.2131 90.5202 40.918 90.5202 43.1557C90.5202 45.7842 89.4707 47.8443 87.3716 49.3361C85.308 50.7924 82.5152 51.5205 78.9929 51.5205Z" fill="url(#paint2_linear_414_137)" />
            <path d="M109.464 29.1434C109.464 29.321 109.393 29.4809 109.251 29.623C109.144 29.7295 109.002 29.7828 108.824 29.7828H103.701C103.523 29.7828 103.434 29.8716 103.434 30.0492V41.3443C103.434 42.5164 103.665 43.3866 104.128 43.9549C104.626 44.5232 105.408 44.8074 106.476 44.8074H108.237C108.415 44.8074 108.557 44.8784 108.664 45.0205C108.806 45.1271 108.877 45.2691 108.877 45.4467V50.5082C108.877 50.8989 108.664 51.1298 108.237 51.2008C106.743 51.2719 105.675 51.3074 105.035 51.3074C102.082 51.3074 99.876 50.8279 98.4173 49.8689C96.9586 48.8743 96.2115 47.0273 96.1759 44.3279V30.0492C96.1759 29.8716 96.0869 29.7828 95.9091 29.7828H92.8671C92.6892 29.7828 92.5291 29.7295 92.3868 29.623C92.2801 29.4809 92.2267 29.321 92.2267 29.1434V24.4016C92.2267 24.224 92.2801 24.082 92.3868 23.9754C92.5291 23.8333 92.6892 23.7623 92.8671 23.7623H95.9091C96.0869 23.7623 96.1759 23.6735 96.1759 23.4959V17.1557C96.1759 16.9781 96.2293 16.8361 96.336 16.7295C96.4783 16.5874 96.6384 16.5164 96.8163 16.5164H102.793C102.971 16.5164 103.114 16.5874 103.22 16.7295C103.363 16.8361 103.434 16.9781 103.434 17.1557V23.4959C103.434 23.6735 103.523 23.7623 103.701 23.7623H108.824C109.002 23.7623 109.144 23.8333 109.251 23.9754C109.393 24.082 109.464 24.224 109.464 24.4016V29.1434Z" fill="url(#paint3_linear_414_137)" />
            <path d="M136.844 34.6312C137.058 35.9809 137.129 37.4904 137.058 39.1598C137.022 39.5861 136.791 39.7992 136.364 39.7992H119.873C119.66 39.7992 119.589 39.888 119.66 40.0656C119.767 40.776 119.962 41.4863 120.247 42.1967C121.172 44.1858 123.058 45.1803 125.904 45.1803C128.181 45.1448 129.978 44.2213 131.294 42.4098C131.436 42.1967 131.596 42.0902 131.774 42.0902C131.881 42.0902 132.006 42.1612 132.148 42.3033L135.99 46.0861C136.168 46.2637 136.257 46.4235 136.257 46.5656C136.257 46.6366 136.186 46.7787 136.044 46.9918C134.87 48.4481 133.358 49.5847 131.507 50.4016C129.657 51.1831 127.629 51.5738 125.424 51.5738C122.364 51.5738 119.767 50.8811 117.632 49.4959C115.533 48.1107 114.021 46.1749 113.096 43.6885C112.349 41.9126 111.975 39.5861 111.975 36.709C111.975 34.7555 112.242 33.0328 112.776 31.541C113.594 29.0191 115.017 27.0123 117.045 25.5205C119.108 24.0287 121.546 23.2828 124.356 23.2828C127.914 23.2828 130.76 24.3128 132.895 26.373C135.065 28.4331 136.382 31.1858 136.844 34.6312ZM124.41 29.7828C122.168 29.7828 120.692 30.8306 119.98 32.9262C119.838 33.388 119.713 33.9563 119.607 34.6312C119.607 34.8087 119.696 34.8975 119.873 34.8975H129.106C129.319 34.8975 129.391 34.8087 129.319 34.6312C129.141 33.6011 129.053 33.1038 129.053 33.1393C128.732 32.0738 128.163 31.2568 127.345 30.6885C126.562 30.0847 125.584 29.7828 124.41 29.7828Z" fill="url(#paint4_linear_414_137)" />
            <path d="M150.538 51.5738C149.286 51.5738 148.119 51.4317 147.037 51.1475C146.012 50.8066 145.386 50.494 145.159 50.2098C144.589 49.5279 144.305 46.0044 144.305 39.6393C144.305 33.2175 145.016 24.5224 146.439 13.5541C147.635 4.51803 150.424 0 154.807 0C155.832 0 156.572 0.568305 157.027 1.70492C157.483 2.7847 157.711 3.83606 157.711 4.85901C157.711 12.247 155.462 20.5158 150.965 29.6656C150.794 34.3825 150.709 38.5027 150.709 42.0262C150.709 45.4929 151.022 47.2262 151.648 47.2262C152.616 47.1694 153.953 45.976 155.661 43.6459C157.369 41.259 159.048 38.2186 160.699 34.5246C162.407 30.8306 163.431 28.9836 163.773 28.9836C164.172 28.9836 164.371 29.2109 164.371 29.6656C164.371 31.2568 163.545 33.7858 161.895 37.2525C157.397 46.8 153.612 51.5738 150.538 51.5738ZM155.576 5.62623C155.576 3.80765 155.348 2.89836 154.893 2.89836C153.185 2.89836 151.933 9.97377 151.136 24.1246C154.096 16.3388 155.576 10.1727 155.576 5.62623Z" fill="url(#paint5_linear_414_137)" />
            <path d="M167.94 51.5738C164.753 51.5738 162.219 50.3803 160.341 47.9934C158.462 45.5497 157.523 42.7934 157.523 39.7246C157.523 33.5301 158.832 28.8415 161.451 25.659C164.069 22.4765 167.456 20.8852 171.612 20.8852C173.547 20.8852 175.141 21.4251 176.394 22.5049C177.646 23.5279 178.272 24.9486 178.272 26.7672C178.272 30.1771 176.821 33.047 173.917 35.3771C171.071 37.6503 167.57 38.8437 163.415 38.9574C163.642 41.1738 164.383 43.106 165.635 44.7541C166.944 46.3454 168.453 47.141 170.16 47.141C171.868 47.141 173.405 46.7432 174.771 45.9475C176.138 45.1519 177.39 44.0153 178.528 42.5377C180.919 39.412 182.969 35.8601 184.676 31.882C185.132 30.859 185.473 30.1202 185.701 29.6656C185.986 29.2109 186.27 28.9836 186.555 28.9836C186.896 28.9836 187.067 29.2109 187.067 29.6656C187.067 32.5071 185.331 36.7694 181.858 42.4525C178.101 48.5333 173.462 51.5738 167.94 51.5738ZM163.415 36.9115C166.773 36.3432 169.221 35.2634 170.758 33.6721C172.352 32.0809 173.149 30.0066 173.149 27.4492C173.149 24.8918 172.324 23.6131 170.673 23.6131C168.68 23.6131 167.001 25.0055 165.635 27.7902C164.269 30.518 163.529 33.5585 163.415 36.9115Z" fill="url(#paint6_linear_414_137)" />
            <path d="M193.469 25.0623L193.639 23.7836C193.639 22.7607 193.042 22.2492 191.846 22.2492C190.708 22.2492 189.598 23.0164 188.516 24.5508C187.434 26.0284 186.894 27.2503 186.894 28.2164C186.894 29.1825 186.951 29.9497 187.064 30.518C187.178 31.0863 187.292 31.5694 187.406 31.9672C187.577 32.3082 187.833 32.7344 188.174 33.2459C188.516 33.7574 188.772 34.1268 188.943 34.3541L189.882 35.5475C190.281 36.1158 190.565 36.4852 190.736 36.6557C193.696 34.212 197.226 31.4842 201.324 28.4721C201.552 28.3016 201.808 28.2164 202.093 28.2164C202.662 28.2164 202.946 28.529 202.946 29.1541C202.946 29.7792 202.69 30.2623 202.178 30.6033C198.535 32.9333 195.091 35.4623 191.846 38.1902C193.098 40.0087 193.725 41.9978 193.725 44.1574C193.725 46.3169 192.899 48.1639 191.248 49.6984C189.598 51.2328 187.491 52 184.93 52C182.368 52 181.087 50.7781 181.087 48.3344C181.087 46.5727 182.966 43.8732 186.723 40.2361C186.438 39.8951 185.926 39.3552 185.186 38.6164C184.446 37.8208 183.877 37.1956 183.478 36.741C183.137 36.2863 182.71 35.6896 182.197 34.9508C181.287 33.5301 180.831 31.9956 180.831 30.3475C180.831 26.9945 181.913 24.2951 184.076 22.2492C186.239 20.1464 188.544 19.0951 190.992 19.0951C192.529 19.0951 193.725 19.5213 194.579 20.3738C195.432 21.1694 195.859 21.9934 195.859 22.8459C195.859 24.7781 195.404 25.7443 194.493 25.7443C193.81 25.7443 193.469 25.5169 193.469 25.0623ZM188.004 41.8557C185.727 44.129 184.588 45.976 184.588 47.3967C184.588 48.7607 185.3 49.4426 186.723 49.4426C187.577 49.4426 188.288 49.1016 188.858 48.4197C190.11 46.7148 189.825 44.5268 188.004 41.8557Z" fill="url(#paint7_linear_414_137)" />
            <path d="M209.522 25.0623L209.693 23.7836C209.693 22.7607 209.095 22.2492 207.9 22.2492C206.761 22.2492 205.651 23.0164 204.57 24.5508C203.488 26.0284 202.947 27.2503 202.947 28.2164C202.947 29.1825 203.004 29.9497 203.118 30.518C203.232 31.0863 203.346 31.5694 203.459 31.9672C203.63 32.3082 203.886 32.7344 204.228 33.2459C204.57 33.7574 204.826 34.1268 204.996 34.3541L205.936 35.5475C206.334 36.1158 206.619 36.4852 206.79 36.6557C209.75 34.212 213.279 31.4842 217.378 28.4721C217.605 28.3016 217.861 28.2164 218.146 28.2164C218.715 28.2164 219 28.529 219 29.1541C219 29.7792 218.744 30.2623 218.232 30.6033C214.588 32.9333 211.144 35.4623 207.9 38.1902C209.152 40.0087 209.778 41.9978 209.778 44.1574C209.778 46.3169 208.953 48.1639 207.302 49.6984C205.651 51.2328 203.545 52 200.983 52C198.422 52 197.141 50.7781 197.141 48.3344C197.141 46.5727 199.019 43.8732 202.776 40.2361C202.492 39.8951 201.979 39.3552 201.239 38.6164C200.499 37.8208 199.93 37.1956 199.532 36.741C199.19 36.2863 198.763 35.6896 198.251 34.9508C197.34 33.5301 196.885 31.9956 196.885 30.3475C196.885 26.9945 197.966 24.2951 200.129 22.2492C202.293 20.1464 204.598 19.0951 207.046 19.0951C208.583 19.0951 209.778 19.5213 210.632 20.3738C211.486 21.1694 211.913 21.9934 211.913 22.8459C211.913 24.7781 211.457 25.7443 210.547 25.7443C209.864 25.7443 209.522 25.5169 209.522 25.0623ZM204.057 41.8557C201.78 44.129 200.642 45.976 200.642 47.3967C200.642 48.7607 201.353 49.4426 202.776 49.4426C203.63 49.4426 204.342 49.1016 204.911 48.4197C206.163 46.7148 205.879 44.5268 204.057 41.8557Z" fill="url(#paint8_linear_414_137)" />
            <path d="M178.073 154.716C183.313 146.658 187.162 138.532 188.849 130.605C196.571 94.3248 168.365 77.4283 153.779 74.6408C141.445 72.4966 114.745 74.1141 103.935 105.506C93.1238 74.1141 66.7188 72.6694 54.3851 74.8136C39.7991 77.6011 11.5923 94.4977 19.3143 130.778C27.0088 166.929 79.3707 207.057 103.935 226.119C119.196 214.276 145.301 194.235 164.73 172.084" stroke="#76C893" strokeWidth="7" />
            <path d="M201 151.175L170.102 131.88L172.013 163.661L186.507 157.418L201 151.175Z" fill="#76C893" />
            <path d="M96.9188 159.84L98.918 159.896C98.9186 159.878 98.9188 159.859 98.9188 159.84H96.9188ZM68.3251 159.84H66.3251C66.3251 159.859 66.3253 159.878 66.3259 159.896L68.3251 159.84ZM98.9188 123.181C98.9188 122.077 98.0234 121.181 96.9188 121.181C95.8143 121.181 94.9188 122.077 94.9188 123.181H98.9188ZM70.3251 123.181C70.3251 122.077 69.4296 121.181 68.3251 121.181C67.2205 121.181 66.3251 122.077 66.3251 123.181H70.3251ZM89.8739 123.181C89.8739 122.077 88.9784 121.181 87.8739 121.181C86.7693 121.181 85.8739 122.077 85.8739 123.181H89.8739ZM80.0995 123.181C80.0995 122.077 79.204 121.181 78.0995 121.181C76.9949 121.181 76.0995 122.077 76.0995 123.181H80.0995ZM77.37 185.987V183.987C76.2655 183.987 75.37 184.883 75.37 185.987H77.37ZM87.2903 185.987H89.2903C89.2903 184.883 88.3949 183.987 87.2903 183.987V185.987ZM94.9188 150.641V159.84H98.9188V150.641H94.9188ZM94.9196 159.784C94.881 161.157 94.5224 163.204 93.6517 164.832C92.8116 166.403 91.6645 167.336 89.9696 167.336V171.336C93.6202 171.336 95.9032 169.104 97.179 166.718C98.4243 164.39 98.8676 161.688 98.918 159.896L94.9196 159.784ZM66.3251 150.641V159.84H70.3251V150.641H66.3251ZM66.3259 159.896C66.3763 161.688 66.8196 164.39 68.0649 166.718C69.3407 169.104 71.6237 171.336 75.2743 171.336V167.336C73.5794 167.336 72.4323 166.403 71.5922 164.832C70.7215 163.204 70.3629 161.157 70.3243 159.784L66.3259 159.896ZM75.2743 171.336H89.9696V167.336H75.2743V171.336ZM98.9188 150.641V123.181H94.9188V150.641H98.9188ZM70.3251 150.641V123.181H66.3251V150.641H70.3251ZM96.9188 148.641H87.8739V152.641H96.9188V148.641ZM89.8739 150.641V123.181H85.8739V150.641H89.8739ZM87.8739 148.641H78.0995V152.641H87.8739V148.641ZM78.0995 148.641H68.3251V152.641H78.0995V148.641ZM80.0995 150.641V123.181H76.0995V150.641H80.0995ZM83.2479 169.628V185.987H87.2479V169.628H83.2479ZM79.37 204.842V185.987H75.37V204.842H79.37ZM77.37 187.987H87.2903V183.987H77.37V187.987ZM85.2903 185.987V213.538H89.2903V185.987H85.2903ZM77.7042 169.628V185.987H81.7042V169.628H77.7042Z" fill="#76C893" />
            <path d="M129.19 169.676V186.061M129.19 169.676C133.43 168.993 140.134 169.676 141.317 155.925C142.22 145.429 140.43 131.932 130.965 125.788C129.486 124.828 128.007 124.325 126.232 124.325C124.457 124.325 122.683 124.828 121.204 125.788C111.739 131.932 109.949 145.429 110.851 155.925C112.035 169.676 119.331 168.993 123.57 169.676M129.19 169.676H123.57M129.19 186.061H123.57M129.19 186.061H131.261V205.664M121.204 212.394V186.061H123.57M123.57 186.061V169.676" stroke="#76C893" strokeWidth="4" strokeLinejoin="round" />
            <defs>
                <linearGradient id="paint0_linear_414_137" x1="0.213514" y1="52.4796" x2="219.019" y2="52.4796" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#76C893" />
                    <stop offset="1" stopColor="#52B69A" />
                </linearGradient>
                <linearGradient id="paint1_linear_414_137" x1="0.213514" y1="52.4796" x2="219.019" y2="52.4796" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#76C893" />
                    <stop offset="1" stopColor="#52B69A" />
                </linearGradient>
                <linearGradient id="paint2_linear_414_137" x1="0.213514" y1="52.4796" x2="219.019" y2="52.4796" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#76C893" />
                    <stop offset="1" stopColor="#52B69A" />
                </linearGradient>
                <linearGradient id="paint3_linear_414_137" x1="0.213514" y1="52.4796" x2="219.019" y2="52.4796" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#76C893" />
                    <stop offset="1" stopColor="#52B69A" />
                </linearGradient>
                <linearGradient id="paint4_linear_414_137" x1="0.213514" y1="52.4796" x2="219.019" y2="52.4796" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#76C893" />
                    <stop offset="1" stopColor="#52B69A" />
                </linearGradient>
                <linearGradient id="paint5_linear_414_137" x1="0.213514" y1="52.4796" x2="219.019" y2="52.4796" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#76C893" />
                    <stop offset="1" stopColor="#52B69A" />
                </linearGradient>
                <linearGradient id="paint6_linear_414_137" x1="0.213514" y1="52.4796" x2="219.019" y2="52.4796" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#76C893" />
                    <stop offset="1" stopColor="#52B69A" />
                </linearGradient>
                <linearGradient id="paint7_linear_414_137" x1="0.213514" y1="52.4796" x2="219.019" y2="52.4796" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#76C893" />
                    <stop offset="1" stopColor="#52B69A" />
                </linearGradient>
                <linearGradient id="paint8_linear_414_137" x1="0.213514" y1="52.4796" x2="219.019" y2="52.4796" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#76C893" />
                    <stop offset="1" stopColor="#52B69A" />
                </linearGradient>
            </defs>
        </svg>
    );
};
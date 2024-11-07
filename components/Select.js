import { useRouter } from 'next/navigation';
export function BtnWRouter(props) {
    const router = useRouter(); // useRouterを使用してrouterオブジェクトを取得
    const handleClick = () => {
      if (props.link === 'engineerList') {
        router.push('/list?role=company'); 
      } else if (props.link === 'companyList') {
        router.push('/list?role=engineer');
      } else {
        router.push('/' + props.link); 
      }
    };

    return (
      <StyledButton onClick={handleClick}>
        {props.text}
      </StyledButton>
    );
}

function StyledButton({children, onClick}) {
  return (
    <button
      onClick={onClick}
      className="p-2 sm:p-4 text-base sm:text-2xl border w-full text-left border-gray-300 rounded-md font-bold text-gray-700 hover:shadow-lg hover:shadow-gray-300 no-underline hover:duration-200 duration-700 hover:-translate-y-1"
    >
      {children}
    </button>
  );
}

function Wrapper(props) {
  return (
      <div className="border pt-4 sm:pt-7 p-3 sm:p-5 flex flex-col border-gray-300 rounded-md text-2xl font-bold text-gray-700 no-underline">
          {props.children}
      </div>
  );
}

// Recommendation List Component
function RecommendationList({ role }) {
  return (
    <div className="max-h-[30vh] overflow-y-auto flex flex-col gap-y-2 sm:gap-y-4 pt-1 sm:pt-2">
      {Array.from({ length: 10 }).map((_, index) => (
        <div
          className="p-2 sm:p-4 uppercase blur-[3px] text-base sm:text-2xl border w-full text-left border-gray-300 rounded-md font-bold text-gray-700 no-underline"
        >
          {`${RevRole(role)} ${index + 1}`}
        </div>
      ))}
    </div>
  );
}

function RgstList({ who }) {
  return (
    <Wrapper>
      <div className="pl-2 mb-2 sm:mb-4 text-lg sm:text-3xl">一覧画面</div>
      <div className='flex-col flex gap-y-3 sm:gap-y-4'>
        {who !== 'engineer' && (
          <BtnWRouter link="engineerList" text="エンジニア一覧" />
        )}
        <BtnWRouter link="companyList" text="企業一覧" />
      </div>
    </Wrapper>
  );
}

// Action List Component
function ActionList({ who }) {
  const actionText = who === 'company' ? '募集してみる' : '応募してみる';
  const buttonText = who === 'company' ? '募集/削除' : '応募/削除';
  return (
    <Wrapper>
      <div className="pl-2 mb-2 sm:mb-4 text-lg sm:text-3xl">{actionText}</div>
      <BtnWRouter link="registrate" text={buttonText} />
    </Wrapper>
  );
}

import { useUser } from '@/context/UserContext';
export default function Select() {
  const router = useRouter(); // useRouterを使用してrouterオブジェクトを取得
  const { userInfo } = useUser();
  const who = userInfo.role;

  return (
    <div className="">
      <div className="grid grid-cols-2 gap-2 sm:gap-x-4 mr-[-.5em] ml-[-.5em] sm:mr-[-1em] sm:ml-[-1em]">
        <RgstList who={who}/>
        <ActionList who={who} />
      </div>
      <div className="mt-4 sm:mt-4 mr-[-.5em] ml-[-.5em] sm:mr-[-1em] sm:ml-[-1em]">
        <Wrapper>
          <div className='pl-2 mb-1 sm:mb-3 flex-row flex gap-x-2 sm:gap-x-4'>
            <div className="text-xl sm:text-3xl">あなたにおすすめ？</div>
            <div className="flex-auto text-right "></div>
            <div className="text-lg sm:text-2xl text-blue-500 cursor-pointer hover:translate-x-3 duration-700 hover:duration-200 pr-3 hover:text-blue-400" 
              onClick={() => router.push('/recommendation')}>詳しく見る&gt;&gt;</div>
          </div>
          <RecommendationList role={userInfo.role}/>
        </Wrapper>
      </div>
    </div>
  );
}

function RevRole(role) {
  switch (role) {
    case 'engineer':
      return 'company';
    case 'company':
      return 'engineer';
    default:
      console.error('Invalid "role" value. Must be either "engineer" or "company".');
      return null;
  }
}
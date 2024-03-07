const Dashboard = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          {/* Общий обзор */}
          <div className="mt-6">
            <div className="bg-white overflow-hidden shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Общий обзор
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Здесь вы можете увидеть общую статистику по предложениям,
                  обсуждениям, вопросам и обратной связи.
                </p>
              </div>
              {/* Список */}
              <div className="border-t border-gray-200">
                <dl>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Предложения
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                      10
                    </dd>
                  </div>
                  <div className="border-t border-gray-200">
                    <dl>
                      <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Обсуждения
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                          5
                        </dd>
                      </div>
                      <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Вопросы
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                          7
                        </dd>
                      </div>
                      <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Обратная связь
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                          3
                        </dd>
                      </div>
                    </dl>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      resources :users, only: [:create, :show]
      post '/login', to: 'auth#create'
      get '/profile', to: 'users#profile'
      resources :categories do 
        resources :submissions, only: [:index, :show]
      end
      resources :submissions, only: [:index, :show, :create]
      resources :upvotes, only: [:create]
    end
  end
end

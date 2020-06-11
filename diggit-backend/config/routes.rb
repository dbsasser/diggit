Rails.application.routes.draw do
  resources :upvotes
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      resources :users, only: [:create]
      post '/login', to: 'auth#create'
      get '/profile', to: 'users#profile'
      resources :categories do 
        resources :submissions
      end
      resources :submissions
      resources :upvotes
    end
  end
end

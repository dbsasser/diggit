class Api::V1::UpvotesController < ApplicationController
    def create 
        @upvote = Upvote.new(upvote_params)
        @upvote.user_id = current_user.id
        if @upvote.save
            render json: { upvote: @upvote }, status: :created
        else 
            render json: { error: 'failed to upvote' }, status: :not_acceptable
        end
    end

    private

    def upvote_params
        params.require(:submission).permit(:submission_id, :user_id)
    end
end

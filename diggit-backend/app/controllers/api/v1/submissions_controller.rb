class Api::V1::SubmissionsController < ApplicationController
    skip_before_action :authorized, only: [:index, :show]

    def create 
        @submission = Submission.new(submission_params)
        @submission.user_id = current_user.id
        if @submission.save
            render json: { submission: @submission }, status: :created
        else 
            render json: { error: 'failed to create post' }, status: :not_acceptable
        end
    end

    def index
        if params[:category_id]
            category = Category.find_by(id: params[:category_id])
            submissions = category.submissions
        else 
            submissions = Submission.all 
        end
        render json: submissions
    end

    def show
        submission = Submission.find_by(id: params[:id])
        render json: submission
    end

    private

    def submission_params 
        params.require(:submission).permit(:title, :link, :category_id, :user_id)
    end

end


